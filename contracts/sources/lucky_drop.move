module bonk::lucky_drop {

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

    /// Drop id already exists
    const E_ERROR_DROP_ID_EXISTS: u64 = 111;

    /// You are not authorized
    const E_ERROR_UNAUTHORIZED: u64 = 0;

    /// Number of winners should be less than or equal to the number of participants
    const E_ERROR_NUMBER_OF_WINNERS: u64 = 1;

    /// Coin is not initialized
    const E_ERROR_COIN_NOT_INITIALIZED: u64 = 2;

    /// Coins in drop is zero
    const E_ERROR_COIN_VALUE_ZERO: u64 = 3;
  

    #[event]
    struct DropCreationEvent has store, drop {
        creator: address,
        drop_id: u64,
        amount: u64,
        coin_type: TypeInfo,
    }

    #[event]
    struct WinnerAnnouncementEvent has store, drop {
        winner: address,
        drop_id: u64,
        amount: u64,
        coin_type: TypeInfo,
        
    }

    #[event]
    struct DropRefundEvent has store, drop {
        creator: address,
        drop_id: u64,
        amount: u64,
        coin_type: TypeInfo,
    }

    struct EventStore has key {
        drop_creation_event: EventHandle<DropCreationEvent>,
        winner_announcement_event: EventHandle<WinnerAnnouncementEvent>,
        drop_refund_event: EventHandle<DropRefundEvent>,
    }


    struct Drop<phantom X> has key, store {
        coins: Coin<X>,
        id: u64,
        creator: address,
    }

    struct DropStore<phantom X> has key {
        drops: SimpleMap<u64, Drop<X>>,
    }

    public entry fun create_drop<X>(
        sender: &signer,
        amount: u64,
        id: u64
    )acquires DropStore, EventStore {
        assert!(coin::is_coin_initialized<X>(), E_ERROR_COIN_NOT_INITIALIZED);
        // withdraw the coins from the sender's account
        let user_coins = coin::withdraw<X>(sender, amount);
        let resource_address = resource_account::get_address();
        let resource_account_signer = resource_account::get_signer();

        if(!exists<DropStore<X>>(resource_address)){
            move_to(&resource_account_signer, DropStore<X> {
                drops: simple_map::create<u64, Drop<X>>()
            });
        };

        let drop_store = borrow_global_mut<DropStore<X>>(resource_address);
        let drops = &mut drop_store.drops;

        if(!simple_map::contains_key(drops, &id)){
            let drop = Drop<X> {
                coins: user_coins,
                id: id,
                creator: signer::address_of(sender),
            };
            simple_map::add(drops, id, drop);
            emit_drop_creation_event<X>(signer::address_of(sender), id, amount);
        } else {
            abort(E_ERROR_DROP_ID_EXISTS)
        }
    }

    public entry fun refund_drop<X>(
        sender: &signer,
        amount: u64,
        id: u64,
    )acquires DropStore, EventStore {
        assert!(coin::is_coin_initialized<X>(), E_ERROR_COIN_NOT_INITIALIZED);
        assert!(signer::address_of(sender) == @bonk , E_ERROR_UNAUTHORIZED);

        let resource_address = resource_account::get_address();
        let resource_account_signer = resource_account::get_signer();
        let drop_store = borrow_global_mut<DropStore<X>>(resource_address);
        let drops = &mut drop_store.drops;

        if(simple_map::contains_key(drops, &id)){
            let drop = simple_map::borrow_mut(drops, &id);
            let creator_address:address = drop.creator;
            let user_coins:Coin<X> = coin::extract<X>(&mut drop.coins, amount);
            coin::deposit<X>(creator_address, user_coins);
            // simple_map::remove(drops, &id);
            emit_drop_refund_event<X>(creator_address, id, amount);

        } else {
            abort(E_ERROR_DROP_ID_EXISTS)
        }
    }


    public entry fun calculate_winner<X>(
        sender: &signer,
        id: u64,
        participants: vector<address>,
        number_of_winners: u64,
    ) acquires DropStore, EventStore {
        assert!(coin::is_coin_initialized<X>(), E_ERROR_COIN_NOT_INITIALIZED);
        assert!(signer::address_of(sender) == @bonk , E_ERROR_UNAUTHORIZED);

        let length_of_participants = vector::length(&participants);
        let resource_address = resource_account::get_address();
        let resource_account_signer = resource_account::get_signer();
        let drop_store = borrow_global_mut<DropStore<X>>(resource_address);
        let drops = &mut drop_store.drops;
        
        assert!(length_of_participants >= number_of_winners, E_ERROR_NUMBER_OF_WINNERS);
        assert!(simple_map::contains_key(drops, &id), E_ERROR_DROP_ID_EXISTS);
       
        let drop = simple_map::borrow_mut(drops, &id);
        let coins_value = coin::value<X>(&drop.coins);
        assert!(coins_value > 0, E_ERROR_COIN_VALUE_ZERO);
        let amount = (coins_value / number_of_winners);
        let permutation_array = randomness::permutation(length_of_participants);
        while(number_of_winners > 0){
            let winner_index = vector::pop_back(&mut permutation_array);
            let winner_address = vector::borrow(&participants, winner_index);
            let winnings = coin::extract<X>(&mut drop.coins, amount);    
            aptos_account::deposit_coins<X>(*winner_address, winnings);
            emit_winner_announcement_event<X>(*winner_address, id, amount);
            number_of_winners = number_of_winners - 1;  
        };
    }

    fun emit_drop_creation_event<X>(
        creator: address,
        drop_id: u64,
        amount: u64,
    ) acquires EventStore {

        let resource_account_signer = resource_account::get_signer();
        let resource_account_address = resource_account::get_address();

       
        if (!exists<EventStore>(resource_account_address)) {            
             let event_store = EventStore {
                drop_creation_event: account::new_event_handle<DropCreationEvent>(&resource_account_signer),
                winner_announcement_event: account::new_event_handle<WinnerAnnouncementEvent>(&resource_account_signer),
                drop_refund_event: account::new_event_handle<DropRefundEvent>(&resource_account_signer)
            };
            move_to(&resource_account_signer, event_store);
        
        };
        
        let event_store = borrow_global_mut<EventStore>(resource_account_address);
        event::emit_event<DropCreationEvent>(
            &mut event_store.drop_creation_event,
            DropCreationEvent {
                creator,
                drop_id,
                amount,
                coin_type: type_of<coin::Coin<X>>(),
            },
        );
    }

    fun emit_winner_announcement_event<X>(
        winner: address,
        drop_id: u64,
        amount: u64,
    ) acquires EventStore {

        let resource_account_signer = resource_account::get_signer();
        let resource_account_address = resource_account::get_address();

       
        if (!exists<EventStore>(resource_account_address)) {            
             let event_store = EventStore {
                drop_creation_event: account::new_event_handle<DropCreationEvent>(&resource_account_signer),
                winner_announcement_event: account::new_event_handle<WinnerAnnouncementEvent>(&resource_account_signer),
                drop_refund_event: account::new_event_handle<DropRefundEvent>(&resource_account_signer)
            };
            move_to(&resource_account_signer, event_store);
        };
        
        let event_store = borrow_global_mut<EventStore>(resource_account_address);
        event::emit_event<WinnerAnnouncementEvent>(
            &mut event_store.winner_announcement_event,
            WinnerAnnouncementEvent {
                winner,
                drop_id,
                amount,
                coin_type: type_of<coin::Coin<X>>(),
            },
        );
    }

    fun emit_drop_refund_event<X>(
        creator: address,
        drop_id: u64,
        amount: u64,
    ) acquires EventStore {

        let resource_account_signer = resource_account::get_signer();
        let resource_account_address = resource_account::get_address();

       
        if (!exists<EventStore>(resource_account_address)) {            
             let event_store = EventStore {
                drop_creation_event: account::new_event_handle<DropCreationEvent>(&resource_account_signer),
                winner_announcement_event: account::new_event_handle<WinnerAnnouncementEvent>(&resource_account_signer),
                drop_refund_event: account::new_event_handle<DropRefundEvent>(&resource_account_signer)
            };
            move_to(&resource_account_signer, event_store);
        
        };
        
        let event_store = borrow_global_mut<EventStore>(resource_account_address);
        event::emit_event<DropRefundEvent>(
            &mut event_store.drop_refund_event,
            DropRefundEvent {
                creator,
                drop_id,
                amount,
                coin_type: type_of<coin::Coin<X>>(),
            },
        );
    }

}