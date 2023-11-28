import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import { createPracticeAccount, fetchUserReducer, newUserReducer, resetCredential, userDetailReducer, userReducer, userRegisterReducer, userUpdateReducer } from "./states/reducers/userReducer";
import { newProductReducer, productDetailReducer, productReducer, productsReducer } from "./states/reducers/productReducer";
import { commissionDetailReducer, commissionReducer, commissionsReducer, newCommissionReducer } from "./states/reducers/commissionReducer";
import { cancelJourney, customJourney, getCustomJourneyByIdReducer, getCustomJourneyReducer, getUserJourneyDetailsByID, newCustomJourneyReducer, newJourneyReducer, userAllJourneyReducer, userJourneyByIdReducer, userJourneyHistoryByIdReducer, userJourneyReducer, userJourneyReducerAlt, userPlacedJourneyReducer, userSubmitJourneyReducer } from "./states/reducers/journeyReducer";
import { chargeWallet, getUserTransactionHistoryReducer, saveWalletAddress, saveWalletPin, userTransactionHistory, userWalletByIdReducer, userWalletReducer, walletAmount } from "./states/reducers/walletReducer";
import { userWithdrawalReducer, withdrawalAnswerReducer, withdrawalRequests } from "./states/reducers/withdrawalReducer";
import { allNotificationReducer, notificationReducer, notificationsreducer } from "./states/reducers/notificationReducer";

const reducer = combineReducers({
    user: userRegisterReducer,
    users: userReducer,
    allUsers: fetchUserReducer,
    newUser: newUserReducer,
    userDetails: userDetailReducer,
    userUpdate: userUpdateReducer,
    resetCredential: resetCredential,
    practiceAccount: createPracticeAccount,
    allProducts: productsReducer,
    newProduct: newProductReducer,
    product: productReducer,
    productDetails: productDetailReducer,
    commission: commissionReducer,
    allCommissions: commissionsReducer,
    newCommission: newCommissionReducer,
    commissionDetail: commissionDetailReducer,
    newJourney: newJourneyReducer,
    cancelJourney: cancelJourney,
    customJournies: getCustomJourneyReducer,
    customJourney: customJourney,
    newCustomJourney: newCustomJourneyReducer,
    customJourneyById: getCustomJourneyByIdReducer,
    userJourney: userJourneyReducer,
    userJourneyById: userJourneyByIdReducer,
    userAllHistory: userAllJourneyReducer,
    userJourneyHistory: userJourneyHistoryByIdReducer,
    userJourneyDetailsByID: getUserJourneyDetailsByID,
    userJourneyy: userJourneyReducerAlt,
    transactions: userTransactionHistory,
    transactionHistory: getUserTransactionHistoryReducer,
    userWallet: userWalletReducer,
    saveWallet: saveWalletAddress,
    saveWalletPin: saveWalletPin,
    chargedWallet: chargeWallet,
    userWalletById: userWalletByIdReducer,
    userWalletAmount: walletAmount,
    userPlacedOrder: userPlacedJourneyReducer,
    userSubmitOrder: userSubmitJourneyReducer,
    userWithdrawal: userWithdrawalReducer,
    allWithdrawalRequest: withdrawalRequests,
    withdrawalAnswer: withdrawalAnswerReducer,
    notification: notificationReducer,
    notifications: notificationsreducer,
    allNotification: allNotificationReducer
});

const persistConfig = {
    key: "rezdy_client_state",
    storage,
    whitelist: ["users"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const middleware = [thunk]

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };