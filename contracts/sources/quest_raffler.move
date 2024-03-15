module bonk::quest_raffler {

    use std::option;
    use std::signer;
    use std::string;
    use std::vector;
    use aptos_std::type_info;
    use aptos_framework::coin::{Self, Coin, MintCapability, BurnCapability};
    use aptos_framework::timestamp;
    use aptos_framework::aptos_account;
    use aptos_framework::account;
    use aptos_framework::randomness;
    use aptos_std::event;
    use aptos_std::event::EventHandle;
    use aptos_std::simple_map::{Self, SimpleMap};
    use aptos_std::smart_vector::{Self, SmartVector};
    use aptos_std::type_info::{TypeInfo, type_of};
    use bonk::resource_account;

    /// Quest id already exists
    const E_ERROR_QUEST_ID_EXISTS: u64 = 111;

    /// You are not authorized
    const E_ERROR_UNAUTHORIZED: u64 = 0;

    /// Number of winners should be less than or equal to the number of participants
    const E_ERROR_NUMBER_OF_WINNERS: u64 = 1;

    /// Coin is not initialized
    const E_ERROR_COIN_NOT_INITIALIZED: u64 = 2;

    /// Coins in quest is zero
    const E_ERROR_COIN_VALUE_ZERO: u64 = 3;
  

    #[event]
    struct QuestCreationEvent has store, drop {
        creator: address,
        quest_id: u64,
        amount: u64,
        coin_type: TypeInfo,
    }

    #[event]
    struct WinnerAnnouncementEvent has store, drop {
        winner: address,
        quest_id: u64,
        amount: u64,
        coin_type: TypeInfo,
        
    }

    #[event]
    struct QuestRefundEvent has store, drop {
        creator: address,
        quest_id: u64,
        amount: u64,
        coin_type: TypeInfo,
    }

    struct EventStore has key {
        quest_creation_event: EventHandle<QuestCreationEvent>,
        winner_announcement_event: EventHandle<WinnerAnnouncementEvent>,
        quest_refund_event: EventHandle<QuestRefundEvent>,
    }


    struct Quest<phantom X> has key, store {
        coins: Coin<X>,
        id: u64,
        creator: address,
    }

    struct QuestStore<phantom X> has key {
        quests: SimpleMap<u64, Quest<X>>,
    }

    public entry fun create_quest<X>(
        sender: &signer,
        amount: u64,
        id: u64
    )acquires QuestStore, EventStore {
        assert!(coin::is_coin_initialized<X>(), E_ERROR_COIN_NOT_INITIALIZED);
        // withdraw the coins from the sender's account
        let user_coins = coin::withdraw<X>(sender, amount);
        let resource_address = resource_account::get_address();
        let resource_account_signer = resource_account::get_signer();

        if(!exists<QuestStore<X>>(resource_address)){
            move_to(&resource_account_signer, QuestStore<X> {
                quests: simple_map::create<u64, Quest<X>>()
            });
        };

        let quest_store = borrow_global_mut<QuestStore<X>>(resource_address);
        let quests = &mut quest_store.quests;

        if(!simple_map::contains_key(quests, &id)){
            let quest = Quest<X> {
                coins: user_coins,
                id: id,
                creator: signer::address_of(sender),
            };
            simple_map::add(quests, id, quest);
            emit_quest_creation_event<X>(signer::address_of(sender), id, amount);
        } else {
            abort(E_ERROR_QUEST_ID_EXISTS)
        }
    }

    public entry fun refund_quest<X>(
        sender: &signer,
        amount: u64,
        id: u64,
    )acquires QuestStore, EventStore {
        assert!(coin::is_coin_initialized<X>(), E_ERROR_COIN_NOT_INITIALIZED);
        assert!(signer::address_of(sender) == @bonk , E_ERROR_UNAUTHORIZED);

        let resource_address = resource_account::get_address();
        let resource_account_signer = resource_account::get_signer();
        let quest_store = borrow_global_mut<QuestStore<X>>(resource_address);
        let quests = &mut quest_store.quests;

        if(simple_map::contains_key(quests, &id)){
            let quest = simple_map::borrow_mut(quests, &id);
            let creator_address:address = quest.creator;
            let user_coins:Coin<X> = coin::extract<X>(&mut quest.coins, amount);
            coin::deposit<X>(creator_address, user_coins);
            // simple_map::remove(quests, &id);
            emit_quest_refund_event<X>(creator_address, id, amount);

        } else {
            abort(E_ERROR_QUEST_ID_EXISTS)
        }
    }


    public entry fun calculate_winner<X>(
        sender: &signer,
        id: u64,
        participants: vector<address>,
        number_of_winners: u64,
    ) acquires QuestStore, EventStore {
        assert!(coin::is_coin_initialized<X>(), E_ERROR_COIN_NOT_INITIALIZED);
        assert!(signer::address_of(sender) == @bonk , E_ERROR_UNAUTHORIZED);

        let length_of_participants = vector::length(&participants);
        let resource_address = resource_account::get_address();
        let resource_account_signer = resource_account::get_signer();
        let quest_store = borrow_global_mut<QuestStore<X>>(resource_address);
        let quests = &mut quest_store.quests;
        
        assert!(length_of_participants >= number_of_winners, E_ERROR_NUMBER_OF_WINNERS);
        assert!(simple_map::contains_key(quests, &id), E_ERROR_QUEST_ID_EXISTS);
       
        let quest = simple_map::borrow_mut(quests, &id);
        let coins_value = coin::value<X>(&quest.coins);
        assert!(coins_value > 0, E_ERROR_COIN_VALUE_ZERO);
        let amount = (coins_value / number_of_winners);
        let permutation_array = randomness::permutation(length_of_participants);
        while(number_of_winners > 0){
            let winner_index = vector::pop_back(&mut permutation_array);
            let winner_address = vector::borrow(&participants, winner_index);
            let winnings = coin::extract<X>(&mut quest.coins, amount);    
            aptos_account::deposit_coins<X>(*winner_address, winnings);
            emit_winner_announcement_event<X>(*winner_address, id, amount);
            number_of_winners = number_of_winners - 1;  
        };
    }

    fun emit_quest_creation_event<X>(
        creator: address,
        quest_id: u64,
        amount: u64,
    ) acquires EventStore {

        let resource_account_signer = resource_account::get_signer();
        let resource_account_address = resource_account::get_address();

       
        if (!exists<EventStore>(resource_account_address)) {            
             let event_store = EventStore {
                quest_creation_event: account::new_event_handle<QuestCreationEvent>(&resource_account_signer),
                winner_announcement_event: account::new_event_handle<WinnerAnnouncementEvent>(&resource_account_signer),
                quest_refund_event: account::new_event_handle<QuestRefundEvent>(&resource_account_signer)
            };
            move_to(&resource_account_signer, event_store);
        
        };
        
        let event_store = borrow_global_mut<EventStore>(resource_account_address);
        event::emit_event<QuestCreationEvent>(
            &mut event_store.quest_creation_event,
            QuestCreationEvent {
                creator,
                quest_id,
                amount,
                coin_type: type_of<coin::Coin<X>>(),
            },
        );
    }

    fun emit_winner_announcement_event<X>(
        winner: address,
        quest_id: u64,
        amount: u64,
    ) acquires EventStore {

        let resource_account_signer = resource_account::get_signer();
        let resource_account_address = resource_account::get_address();

       
        if (!exists<EventStore>(resource_account_address)) {            
             let event_store = EventStore {
                quest_creation_event: account::new_event_handle<QuestCreationEvent>(&resource_account_signer),
                winner_announcement_event: account::new_event_handle<WinnerAnnouncementEvent>(&resource_account_signer),
                quest_refund_event: account::new_event_handle<QuestRefundEvent>(&resource_account_signer)
            };
            move_to(&resource_account_signer, event_store);
        };
        
        let event_store = borrow_global_mut<EventStore>(resource_account_address);
        event::emit_event<WinnerAnnouncementEvent>(
            &mut event_store.winner_announcement_event,
            WinnerAnnouncementEvent {
                winner,
                quest_id,
                amount,
                coin_type: type_of<coin::Coin<X>>(),
            },
        );
    }

    fun emit_quest_refund_event<X>(
        creator: address,
        quest_id: u64,
        amount: u64,
    ) acquires EventStore {

        let resource_account_signer = resource_account::get_signer();
        let resource_account_address = resource_account::get_address();

       
        if (!exists<EventStore>(resource_account_address)) {            
             let event_store = EventStore {
                quest_creation_event: account::new_event_handle<QuestCreationEvent>(&resource_account_signer),
                winner_announcement_event: account::new_event_handle<WinnerAnnouncementEvent>(&resource_account_signer),
                quest_refund_event: account::new_event_handle<QuestRefundEvent>(&resource_account_signer)
            };
            move_to(&resource_account_signer, event_store);
        
        };
        
        let event_store = borrow_global_mut<EventStore>(resource_account_address);
        event::emit_event<QuestRefundEvent>(
            &mut event_store.quest_refund_event,
            QuestRefundEvent {
                creator,
                quest_id,
                amount,
                coin_type: type_of<coin::Coin<X>>(),
            },
        );
    }

}