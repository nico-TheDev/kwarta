import AccountIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import CashflowIcon from '@mui/icons-material/InsertChartRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import OutboxRoundedIcon from '@mui/icons-material/OutboxRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import WalletRoundedIcon from '@mui/icons-material/WalletRounded';

import FastfoodRoundedIcon from '@mui/icons-material/FastfoodRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';
import DirectionsRailwayRoundedIcon from '@mui/icons-material/DirectionsRailwayRounded';
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import OfflineBoltRoundedIcon from '@mui/icons-material/OfflineBoltRounded';
import WaterDamageRoundedIcon from '@mui/icons-material/WaterDamageRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';
import RouterRoundedIcon from '@mui/icons-material/RouterRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import BuildCircleRoundedIcon from '@mui/icons-material/BuildCircleRounded';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';
import SmartDisplayRoundedIcon from '@mui/icons-material/SmartDisplayRounded';
import AirplaneTicketRoundedIcon from '@mui/icons-material/AirplaneTicketRounded';
import SpaRoundedIcon from '@mui/icons-material/SpaRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import TwoWheelerRoundedIcon from '@mui/icons-material/TwoWheelerRounded';
import PedalBikeRoundedIcon from '@mui/icons-material/PedalBikeRounded';
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import CheckroomRoundedIcon from '@mui/icons-material/CheckroomRounded';
import SpeakerGroupRoundedIcon from '@mui/icons-material/SpeakerGroupRounded';
import GroupWorkRoundedIcon from '@mui/icons-material/GroupWorkRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';

import { ICON_NAMES } from 'constants/constant';

export function Icon(props) {
    const name = props.name;
    // SYSTEM ICONS
    if (name === ICON_NAMES.SYSTEM_ICONS.ACCOUNTS) return <AccountIcon {...props} />;
    else if (name === ICON_NAMES.SYSTEM_ICONS.CASHFLOW) return <CashflowIcon {...props} />;
    else if (name === ICON_NAMES.SYSTEM_ICONS.CATEGORIES) return <CategoryRoundedIcon {...props} />;
    else if (name === ICON_NAMES.SYSTEM_ICONS.DASHBOARD) return <GridViewRoundedIcon {...props} />;
    else if (name === ICON_NAMES.SYSTEM_ICONS.EDUCATION) return <AutoStoriesRoundedIcon {...props} />;
    else if (name === ICON_NAMES.SYSTEM_ICONS.PROFILE) return <AccountCircleRoundedIcon {...props} />;
    else if (name === ICON_NAMES.SYSTEM_ICONS.SETTINGS) return <SettingsRoundedIcon {...props} />;
    else if (name === ICON_NAMES.SYSTEM_ICONS.TRANSACTIONS) return <PaidRoundedIcon {...props} />;

    else if (name === ICON_NAMES.SYSTEM_ICONS.ADD) return <AddRoundedIcon {...props} />;
    else if (name === ICON_NAMES.SYSTEM_ICONS.BACK) return <ArrowBackRoundedIcon {...props} />;
    else if (name === ICON_NAMES.SYSTEM_ICONS.DROPDOWN) return <ArrowDropDownRoundedIcon {...props} />;
    else if (name === ICON_NAMES.SYSTEM_ICONS.DOWNLOAD) return <DownloadRoundedIcon {...props} />;
    else if (name === ICON_NAMES.SYSTEM_ICONS.EDIT) return <EditRoundedIcon {...props} />;
    else if (name === ICON_NAMES.SYSTEM_ICONS.HISTORY) return <HistoryRoundedIcon {...props} />;
    else if (name === ICON_NAMES.SYSTEM_ICONS.NOTIFICATIONS) return <NotificationsRoundedIcon {...props} />;
    else if (name === ICON_NAMES.SYSTEM_ICONS.REFRESH) return <RefreshRoundedIcon {...props} />;
    else if (name === ICON_NAMES.SYSTEM_ICONS.RECEIVE_MONEY) return <EmailRoundedIcon {...props} />;
    else if (name === ICON_NAMES.SYSTEM_ICONS.SEARCH) return <SearchRoundedIcon {...props} />;
    else if (name === ICON_NAMES.SYSTEM_ICONS.SEND_MONEY) return <OutboxRoundedIcon {...props} />;
    else if (name === ICON_NAMES.SYSTEM_ICONS.TIME) return <AccessTimeFilledRoundedIcon {...props} />;

    //ACCOUNT ICONS
    else if (name === ICON_NAMES.ACCOUNT_ICONS.BANK) return <WalletRoundedIcon {...props} />;
    else if (name === ICON_NAMES.ACCOUNT_ICONS.CREDIT_CARD) return <CreditCardRoundedIcon {...props} />;
    else if (name === ICON_NAMES.ACCOUNT_ICONS.WALLET) return <AccountBalanceRoundedIcon {...props} />;

    //CATEGORY ICONS
    else if (name === ICON_NAMES.CATEGORY_ICONS.AIRLINE_FARE) return <AirplaneTicketRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.BICYCLE) return <PedalBikeRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.BUSFARE) return <DirectionsBusRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.BUSINESS) return <BusinessCenterRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.CAR) return <DirectionsCarRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.CLOTHES) return <CheckroomRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.FOOD) return <FastfoodRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.FREELANCE_JOB) return <GroupWorkRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.EDUCATION) return <SchoolRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.ELECTRICITY_BILLS) return <OfflineBoltRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.ELECTRONICS) return <SpeakerGroupRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.FITNESS) return <FitnessCenterRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.FULLTIME_JOB) return <WorkRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.GAMING) return <SportsEsportsRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.GIFT) return <CardGiftcardRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.GROCERY) return <LocalGroceryStoreRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.HEALTH) return <LocalHospitalRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.INTERNET_BILLS) return <RouterRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.JEWELRY) return <DiamondRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.MAINTENANCE) return <BuildCircleRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.MOTORCYCLE) return <TwoWheelerRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.PERSONAL_CARE) return <SpaRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.PETS) return <PetsRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.PHONE) return <SmartphoneRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.SUBSCRIPTIONS) return <SmartDisplayRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.TOYS) return <SmartToyRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.TRAINFARE) return <DirectionsRailwayRoundedIcon {...props} />;
    else if (name === ICON_NAMES.CATEGORY_ICONS.WATER_BILLS) return <WaterDamageRoundedIcon {...props} />;
}
