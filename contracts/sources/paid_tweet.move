module bonk::paid_tweets {

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

    /// Tweet id already exists
    const E_ERROR_TWEET_ID_EXISTS: u64 = 111;

    /// Tweet id does not exist
    const E_ERROR_TWEET_ID_DOES_NOT_EXIST: u64 = 112;

    /// Tweet already bought
    const E_ERROR_USER_ALREADY_BOUGHT: u64 = 113;

    /// You are not authorized
    const E_ERROR_UNAUTHORIZED: u64 = 0;

    /// Number of winners should be less than or equal to the number of participants
    const E_ERROR_NUMBER_OF_WINNERS: u64 = 1;

    /// Coin is not initialized
    const E_ERROR_COIN_NOT_INITIALIZED: u64 = 2;

    /// Coins in quest is zero
    const E_ERROR_COIN_VALUE_ZERO: u64 = 3;
  

    // #[event]
    // struct TweetCreationEvent has store, drop {
    //     creator: address,
    //     tweet_id: u64,
    //     amount: u64,
    //     coin_type: TypeInfo,
    // }

    // #[event]
    // struct TweetBoughtEvent has store, drop {
    //     buyer: address,
    //     tweet_id: u64,
    //     amount: u64,
    //     coin_type: TypeInfo,
        
    // }

    // #[event]
    // struct QuestRefundEvent has store, drop {
    //     creator: address,
    //     quest_id: u64,
    //     amount: u64,
    //     coin_type: TypeInfo,
    // }

    // struct EventStore has key {
    //     tweet_creation_event: EventHandle<TweetCreationEvent>,
    //     tweet_bought_event: EventHandle<TweetBoughtEvent>,
    //     // quest_refund_event: EventHandle<QuestRefundEvent>,
    // }


    struct Tweet<phantom X> has key, store {
        coins: Coin<X>,
        price: u64,
        id: u64,
        creator: address,
    }

    struct TweetStore<phantom X> has key {
        tweets: SimpleMap<u64, Tweet<X>>,
    }

    struct UserBalances<phantom X> has key {
        user_balance: SimpleMap<u64, bool>,
    }
// 0x1::aptos_coin::AptosCoin
    public entry fun create_tweet<X>(
        sender: &signer,
        amount: u64,
        id: u64
    )acquires TweetStore {
        assert!(coin::is_coin_initialized<X>(), E_ERROR_COIN_NOT_INITIALIZED);
        // withdraw the coins from the sender's account
        // let user_coins = coin::withdraw<X>(sender, amount);
        let resource_address = resource_account::get_address();
        let resource_account_signer = resource_account::get_signer();

        if(!exists<TweetStore<X>>(resource_address)){
            move_to(&resource_account_signer, TweetStore<X>{
                tweets: simple_map::create<u64, Tweet<X>>()
            });
        };

        let tweet_store = borrow_global_mut<TweetStore<X>>(resource_address);
        let tweets = &mut tweet_store.tweets;

        if(!simple_map::contains_key(tweets, &id)){
            let tweet = Tweet<X> {
                coins: coin::zero<X>(),
                price: amount,
                id: id,
                creator: signer::address_of(sender),
            };
            simple_map::add(tweets, id, tweet);
            // emit_tweet_creation_event<X>(signer::address_of(sender), id, amount);
        } else {
            abort(E_ERROR_TWEET_ID_EXISTS)
        }
    }

    public entry fun buy_tweet<X>(
        sender: &signer,
        id: u64
    ) acquires TweetStore, UserBalances {
        assert!(coin::is_coin_initialized<X>(), E_ERROR_COIN_NOT_INITIALIZED);
        // assert!(signer::address_of(sender) == @bonk , E_ERROR_UNAUTHORIZED);

        let buyer_adress = signer::address_of(sender);

        if(!exists<UserBalances<X>>(buyer_adress)){
            move_to(sender, UserBalances<X>{
                user_balance: simple_map::create<u64,bool>()
            });
        };

        let user_balances = borrow_global_mut<UserBalances<X>>(buyer_adress);
        let user_balance = &mut user_balances.user_balance;

        if(!simple_map::contains_key(user_balance, &id)){
            let resource_address = resource_account::get_address();
            let resource_account_signer = resource_account::get_signer();
            let tweet_store = borrow_global_mut<TweetStore<X>>(resource_address);
            let tweets = &mut tweet_store.tweets;
        
            assert!(simple_map::contains_key(tweets, &id), E_ERROR_TWEET_ID_DOES_NOT_EXIST);
       
            let tweet = simple_map::borrow_mut(tweets, &id);
            let post_price = tweet.price;
            let user_coins = coin::withdraw<X>(sender, post_price);
            coin::merge<X>(&mut tweet.coins, user_coins);
            simple_map::add(user_balance, id, true);
        } else {
            abort(E_ERROR_USER_ALREADY_BOUGHT)
        }
    }

    public entry fun withdraw_tweet_earnings<X>(
        sender: &signer,
        id: u64
    ) acquires TweetStore{
        assert!(coin::is_coin_initialized<X>(), E_ERROR_COIN_NOT_INITIALIZED);

        let resource_address = resource_account::get_address();
        let resource_account_signer = resource_account::get_signer();
        let tweet_store = borrow_global_mut<TweetStore<X>>(resource_address);
        let tweets = &mut tweet_store.tweets;
        
        assert!(simple_map::contains_key(tweets, &id), E_ERROR_TWEET_ID_DOES_NOT_EXIST);
       
        let tweet = simple_map::borrow_mut(tweets, &id);
        let tweet_creator = &tweet.creator;
        assert!(signer::address_of(sender) == *tweet_creator, E_ERROR_UNAUTHORIZED);
        let tweet_coins = &mut tweet.coins;
        let coins_amount = coin::value<X>(tweet_coins);
        let extracted_coins = coin::extract<X>(tweet_coins, coins_amount);
        if(!coin::is_account_registered<X>(*tweet_creator)) {
            coin::register<X>(sender);
        };
        coin::deposit<X>(*tweet_creator, extracted_coins);
    }

    #[view]
    public fun is_owner<X>(
        id: u64,
        buyer_adress: address
    ): bool acquires UserBalances{
        if(exists<UserBalances<X>>(buyer_adress)){
            let user_balances = borrow_global_mut<UserBalances<X>>(buyer_adress);
            let user_balance = &mut user_balances.user_balance;
            if(simple_map::contains_key(user_balance, &id)){
                true
            } else {
                false
            }
        } else {
            false
        }

    }
    

    // fun emit_quest_creation_event<X>(
    //     creator: address,
    //     quest_id: u64,
    //     amount: u64,
    // ) acquires EventStore {

    //     let resource_account_signer = resource_account::get_signer();
    //     let resource_account_address = resource_account::get_address();

       
    //     if (!exists<EventStore>(resource_account_address)) {            
    //          let event_store = EventStore {
    //             quest_creation_event: account::new_event_handle<QuestCreationEvent>(&resource_account_signer),
    //             winner_announcement_event: account::new_event_handle<WinnerAnnouncementEvent>(&resource_account_signer),
    //             quest_refund_event: account::new_event_handle<QuestRefundEvent>(&resource_account_signer)
    //         };
    //         move_to(&resource_account_signer, event_store);
        
    //     };
        
    //     let event_store = borrow_global_mut<EventStore>(resource_account_address);
    //     event::emit_event<QuestCreationEvent>(
    //         &mut event_store.quest_creation_event,
    //         QuestCreationEvent {
    //             creator,
    //             quest_id,
    //             amount,
    //             coin_type: type_of<coin::Coin<X>>(),
    //         },
    //     );
    // }

    // fun emit_winner_announcement_event<X>(
    //     winner: address,
    //     quest_id: u64,
    //     amount: u64,
    // ) acquires EventStore {

    //     let resource_account_signer = resource_account::get_signer();
    //     let resource_account_address = resource_account::get_address();

       
    //     if (!exists<EventStore>(resource_account_address)) {            
    //          let event_store = EventStore {
    //             quest_creation_event: account::new_event_handle<QuestCreationEvent>(&resource_account_signer),
    //             winner_announcement_event: account::new_event_handle<WinnerAnnouncementEvent>(&resource_account_signer),
    //             quest_refund_event: account::new_event_handle<QuestRefundEvent>(&resource_account_signer)
    //         };
    //         move_to(&resource_account_signer, event_store);
    //     };
        
    //     let event_store = borrow_global_mut<EventStore>(resource_account_address);
    //     event::emit_event<WinnerAnnouncementEvent>(
    //         &mut event_store.winner_announcement_event,
    //         WinnerAnnouncementEvent {
    //             winner,
    //             quest_id,
    //             amount,
    //             coin_type: type_of<coin::Coin<X>>(),
    //         },
    //     );
    // }

    // fun emit_quest_refund_event<X>(
    //     creator: address,
    //     quest_id: u64,
    //     amount: u64,
    // ) acquires EventStore {

    //     let resource_account_signer = resource_account::get_signer();
    //     let resource_account_address = resource_account::get_address();

       
    //     if (!exists<EventStore>(resource_account_address)) {            
    //          let event_store = EventStore {
    //             quest_creation_event: account::new_event_handle<QuestCreationEvent>(&resource_account_signer),
    //             winner_announcement_event: account::new_event_handle<WinnerAnnouncementEvent>(&resource_account_signer),
    //             quest_refund_event: account::new_event_handle<QuestRefundEvent>(&resource_account_signer)
    //         };
    //         move_to(&resource_account_signer, event_store);
        
    //     };
        
    //     let event_store = borrow_global_mut<EventStore>(resource_account_address);
    //     event::emit_event<QuestRefundEvent>(
    //         &mut event_store.quest_refund_event,
    //         QuestRefundEvent {
    //             creator,
    //             quest_id,
    //             amount,
    //             coin_type: type_of<coin::Coin<X>>(),
    //         },
    //     );
    // }

}