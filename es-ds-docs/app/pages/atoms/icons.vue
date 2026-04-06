<script setup lang="ts">
import IconArrowClockwise from '@energysage/es-ds-components/app/components/icon/arrow-clockwise.vue';
import IconArrowCounterClockwise from '@energysage/es-ds-components/app/components/icon/arrow-counter-clockwise.vue';
import IconArrowCycle from '@energysage/es-ds-components/app/components/icon/arrow-cycle.vue';
import IconArrowDown from '@energysage/es-ds-components/app/components/icon/arrow-down.vue';
import IconArrowLeft from '@energysage/es-ds-components/app/components/icon/arrow-left.vue';
import IconArrowRight from '@energysage/es-ds-components/app/components/icon/arrow-right.vue';
import IconArrowUp from '@energysage/es-ds-components/app/components/icon/arrow-up.vue';
import IconBank from '@energysage/es-ds-components/app/components/icon/bank.vue';
import IconBattery from '@energysage/es-ds-components/app/components/icon/battery.vue';
import IconBatteryChargingVertical from '@energysage/es-ds-components/app/components/icon/battery-charging-vertical.vue';
import IconBell from '@energysage/es-ds-components/app/components/icon/bell.vue';
import IconBlock from '@energysage/es-ds-components/app/components/icon/block.vue';
import IconBluesky from '@energysage/es-ds-components/app/components/icon/bluesky.vue';
import IconBolt from '@energysage/es-ds-components/app/components/icon/bolt.vue';
import IconBusiness from '@energysage/es-ds-components/app/components/icon/business.vue';
import IconCalculator from '@energysage/es-ds-components/app/components/icon/calculator.vue';
import IconCalendar from '@energysage/es-ds-components/app/components/icon/calendar.vue';
import IconCart from '@energysage/es-ds-components/app/components/icon/cart.vue';
import IconChargingStation from '@energysage/es-ds-components/app/components/icon/charging-station.vue';
import IconChatAdd from '@energysage/es-ds-components/app/components/icon/chat-add.vue';
import IconChatApprove from '@energysage/es-ds-components/app/components/icon/chat-approve.vue';
import IconChatBubble from '@energysage/es-ds-components/app/components/icon/chat-bubble.vue';
import IconChatDots from '@energysage/es-ds-components/app/components/icon/chat-dots.vue';
import IconChevronDown from '@energysage/es-ds-components/app/components/icon/chevron-down.vue';
import IconChevronHorizontal from '@energysage/es-ds-components/app/components/icon/chevron-horizontal.vue';
import IconChevronLeft from '@energysage/es-ds-components/app/components/icon/chevron-left.vue';
import IconChevronRight from '@energysage/es-ds-components/app/components/icon/chevron-right.vue';
import IconChevronUp from '@energysage/es-ds-components/app/components/icon/chevron-up.vue';
import IconCircle from '@energysage/es-ds-components/app/components/icon/circle.vue';
import IconCircleAlert from '@energysage/es-ds-components/app/components/icon/circle-alert.vue';
import IconCircleCheck from '@energysage/es-ds-components/app/components/icon/circle-check.vue';
import IconCircleChevronDown from '@energysage/es-ds-components/app/components/icon/circle-chevron-down.vue';
import IconCircleChevronLeft from '@energysage/es-ds-components/app/components/icon/circle-chevron-left.vue';
import IconCircleChevronRight from '@energysage/es-ds-components/app/components/icon/circle-chevron-right.vue';
import IconCircleChevronUp from '@energysage/es-ds-components/app/components/icon/circle-chevron-up.vue';
import IconCircleMinus from '@energysage/es-ds-components/app/components/icon/circle-minus.vue';
import IconCirclePlus from '@energysage/es-ds-components/app/components/icon/circle-plus.vue';
import IconCircleX from '@energysage/es-ds-components/app/components/icon/circle-x.vue';
import IconCheck from '@energysage/es-ds-components/app/components/icon/check.vue';
import IconClock from '@energysage/es-ds-components/app/components/icon/clock.vue';
import IconCommunitySolar from '@energysage/es-ds-components/app/components/icon/community-solar.vue';
import IconCompanies from '@energysage/es-ds-components/app/components/icon/companies.vue';
import IconContactUs from '@energysage/es-ds-components/app/components/icon/contact-us.vue';
import IconCopy from '@energysage/es-ds-components/app/components/icon/copy.vue';
import IconCreditCard from '@energysage/es-ds-components/app/components/icon/credit-card.vue';
import IconDocument from '@energysage/es-ds-components/app/components/icon/document.vue';
import IconElectricityCircle from '@energysage/es-ds-components/app/components/icon/electricity-circle.vue';
import IconElectricVehicle from '@energysage/es-ds-components/app/components/icon/electric-vehicle.vue';
import IconEnvelope from '@energysage/es-ds-components/app/components/icon/envelope.vue';
import IconEsLeaf from '@energysage/es-ds-components/app/components/icon/es-leaf.vue';
import IconEye from '@energysage/es-ds-components/app/components/icon/eye.vue';
import IconFacebook from '@energysage/es-ds-components/app/components/icon/facebook.vue';
import IconFileDoc from '@energysage/es-ds-components/app/components/icon/file-doc.vue';
import IconFileDocx from '@energysage/es-ds-components/app/components/icon/file-docx.vue';
import IconFilePdf from '@energysage/es-ds-components/app/components/icon/file-pdf.vue';
import IconFolder from '@energysage/es-ds-components/app/components/icon/folder.vue';
import IconFlag from '@energysage/es-ds-components/app/components/icon/flag.vue';
import IconGear from '@energysage/es-ds-components/app/components/icon/gear.vue';
import IconGift from '@energysage/es-ds-components/app/components/icon/gift.vue';
import IconHamburger from '@energysage/es-ds-components/app/components/icon/hamburger.vue';
import IconHeart from '@energysage/es-ds-components/app/components/icon/heart.vue';
import IconHeatPump from '@energysage/es-ds-components/app/components/icon/heat-pump.vue';
import IconHouseLine from '@energysage/es-ds-components/app/components/icon/house-line.vue';
import IconImage from '@energysage/es-ds-components/app/components/icon/image.vue';
import IconInfo from '@energysage/es-ds-components/app/components/icon/info.vue';
import IconInfoBlogPost from '@energysage/es-ds-components/app/components/icon/info-blog-post.vue';
import IconInstagram from '@energysage/es-ds-components/app/components/icon/instagram.vue';
import IconLightBulb from '@energysage/es-ds-components/app/components/icon/light-bulb.vue';
import IconLinkedin from '@energysage/es-ds-components/app/components/icon/linkedin.vue';
import IconLinkOut from '@energysage/es-ds-components/app/components/icon/link-out.vue';
import IconLocation from '@energysage/es-ds-components/app/components/icon/location.vue';
import IconLockOff from '@energysage/es-ds-components/app/components/icon/lock-off.vue';
import IconLockOn from '@energysage/es-ds-components/app/components/icon/lock-on.vue';
import IconMarketplace from '@energysage/es-ds-components/app/components/icon/marketplace.vue';
import IconMinus from '@energysage/es-ds-components/app/components/icon/minus.vue';
import IconMoney from '@energysage/es-ds-components/app/components/icon/money.vue';
import IconMoneyBag from '@energysage/es-ds-components/app/components/icon/money-bag.vue';
import IconOpenEnvelope from '@energysage/es-ds-components/app/components/icon/open-envelope.vue';
import IconPaper from '@energysage/es-ds-components/app/components/icon/paper.vue';
import IconPayback from '@energysage/es-ds-components/app/components/icon/payback.vue';
import IconPencil from '@energysage/es-ds-components/app/components/icon/pencil.vue';
import IconPerson from '@energysage/es-ds-components/app/components/icon/person.vue';
import IconPersonAdd from '@energysage/es-ds-components/app/components/icon/person-add.vue';
import IconPersonCheck from '@energysage/es-ds-components/app/components/icon/person-check.vue';
import IconPersonCross from '@energysage/es-ds-components/app/components/icon/person-cross.vue';
import IconPhone from '@energysage/es-ds-components/app/components/icon/phone.vue';
import IconPlay from '@energysage/es-ds-components/app/components/icon/play.vue';
import IconPlus from '@energysage/es-ds-components/app/components/icon/plus.vue';
import IconRoof from '@energysage/es-ds-components/app/components/icon/roof.vue';
import IconRooftopSolar from '@energysage/es-ds-components/app/components/icon/rooftop-solar.vue';
import IconSaving from '@energysage/es-ds-components/app/components/icon/saving.vue';
import IconSearch from '@energysage/es-ds-components/app/components/icon/search.vue';
import IconSettingsHorizontal from '@energysage/es-ds-components/app/components/icon/settings-horizontal.vue';
import IconSettingsVertical from '@energysage/es-ds-components/app/components/icon/settings-vertical.vue';
import IconShield from '@energysage/es-ds-components/app/components/icon/shield.vue';
import IconShieldWithCheck from '@energysage/es-ds-components/app/components/icon/shield-with-check.vue';
import IconShoppingBag from '@energysage/es-ds-components/app/components/icon/shopping-bag.vue';
import IconSolar from '@energysage/es-ds-components/app/components/icon/solar.vue';
import IconSoundDown from '@energysage/es-ds-components/app/components/icon/sound-down.vue';
import IconSoundOff from '@energysage/es-ds-components/app/components/icon/sound-off.vue';
import IconSoundOn from '@energysage/es-ds-components/app/components/icon/sound-on.vue';
import IconSoundUp from '@energysage/es-ds-components/app/components/icon/sound-up.vue';
import IconStarEmpty from '@energysage/es-ds-components/app/components/icon/star-empty.vue';
import IconStarFull from '@energysage/es-ds-components/app/components/icon/star-full.vue';
import IconStarHalf from '@energysage/es-ds-components/app/components/icon/star-half.vue';
import IconStateAk from '@energysage/es-ds-components/app/components/icon/state-ak.vue';
import IconStateAl from '@energysage/es-ds-components/app/components/icon/state-al.vue';
import IconStateAr from '@energysage/es-ds-components/app/components/icon/state-ar.vue';
import IconStateAz from '@energysage/es-ds-components/app/components/icon/state-az.vue';
import IconStateCa from '@energysage/es-ds-components/app/components/icon/state-ca.vue';
import IconStateCo from '@energysage/es-ds-components/app/components/icon/state-co.vue';
import IconStateCt from '@energysage/es-ds-components/app/components/icon/state-ct.vue';
import IconStateDc from '@energysage/es-ds-components/app/components/icon/state-dc.vue';
import IconStateDe from '@energysage/es-ds-components/app/components/icon/state-de.vue';
import IconStateFl from '@energysage/es-ds-components/app/components/icon/state-fl.vue';
import IconStateGa from '@energysage/es-ds-components/app/components/icon/state-ga.vue';
import IconStateHi from '@energysage/es-ds-components/app/components/icon/state-hi.vue';
import IconStateIa from '@energysage/es-ds-components/app/components/icon/state-ia.vue';
import IconStateId from '@energysage/es-ds-components/app/components/icon/state-id.vue';
import IconStateIl from '@energysage/es-ds-components/app/components/icon/state-il.vue';
import IconStateIn from '@energysage/es-ds-components/app/components/icon/state-in.vue';
import IconStateKs from '@energysage/es-ds-components/app/components/icon/state-ks.vue';
import IconStateKy from '@energysage/es-ds-components/app/components/icon/state-ky.vue';
import IconStateLa from '@energysage/es-ds-components/app/components/icon/state-la.vue';
import IconStateMa from '@energysage/es-ds-components/app/components/icon/state-ma.vue';
import IconStateMd from '@energysage/es-ds-components/app/components/icon/state-md.vue';
import IconStateMe from '@energysage/es-ds-components/app/components/icon/state-me.vue';
import IconStateMi from '@energysage/es-ds-components/app/components/icon/state-mi.vue';
import IconStateMn from '@energysage/es-ds-components/app/components/icon/state-mn.vue';
import IconStateMo from '@energysage/es-ds-components/app/components/icon/state-mo.vue';
import IconStateMs from '@energysage/es-ds-components/app/components/icon/state-ms.vue';
import IconStateMt from '@energysage/es-ds-components/app/components/icon/state-mt.vue';
import IconStateNc from '@energysage/es-ds-components/app/components/icon/state-nc.vue';
import IconStateNd from '@energysage/es-ds-components/app/components/icon/state-nd.vue';
import IconStateNe from '@energysage/es-ds-components/app/components/icon/state-ne.vue';
import IconStateNh from '@energysage/es-ds-components/app/components/icon/state-nh.vue';
import IconStateNj from '@energysage/es-ds-components/app/components/icon/state-nj.vue';
import IconStateNm from '@energysage/es-ds-components/app/components/icon/state-nm.vue';
import IconStateNv from '@energysage/es-ds-components/app/components/icon/state-nv.vue';
import IconStateNy from '@energysage/es-ds-components/app/components/icon/state-ny.vue';
import IconStateOh from '@energysage/es-ds-components/app/components/icon/state-oh.vue';
import IconStateOk from '@energysage/es-ds-components/app/components/icon/state-ok.vue';
import IconStateOr from '@energysage/es-ds-components/app/components/icon/state-or.vue';
import IconStatePa from '@energysage/es-ds-components/app/components/icon/state-pa.vue';
import IconStateRi from '@energysage/es-ds-components/app/components/icon/state-ri.vue';
import IconStateSc from '@energysage/es-ds-components/app/components/icon/state-sc.vue';
import IconStateSd from '@energysage/es-ds-components/app/components/icon/state-sd.vue';
import IconStateTn from '@energysage/es-ds-components/app/components/icon/state-tn.vue';
import IconStateTx from '@energysage/es-ds-components/app/components/icon/state-tx.vue';
import IconStateUt from '@energysage/es-ds-components/app/components/icon/state-ut.vue';
import IconStateVa from '@energysage/es-ds-components/app/components/icon/state-va.vue';
import IconStateVt from '@energysage/es-ds-components/app/components/icon/state-vt.vue';
import IconStateWa from '@energysage/es-ds-components/app/components/icon/state-wa.vue';
import IconStateWi from '@energysage/es-ds-components/app/components/icon/state-wi.vue';
import IconStateWv from '@energysage/es-ds-components/app/components/icon/state-wv.vue';
import IconStateWy from '@energysage/es-ds-components/app/components/icon/state-wy.vue';
import IconThreads from '@energysage/es-ds-components/app/components/icon/threads.vue';
import IconThumbsUp from '@energysage/es-ds-components/app/components/icon/thumbs-up.vue';
import IconTrashCan from '@energysage/es-ds-components/app/components/icon/trash-can.vue';
import IconTree from '@energysage/es-ds-components/app/components/icon/tree.vue';
import IconTwitter from '@energysage/es-ds-components/app/components/icon/twitter.vue';
import IconUpload from '@energysage/es-ds-components/app/components/icon/upload.vue';
import IconVerified from '@energysage/es-ds-components/app/components/icon/verified.vue';
import IconVideoPlay from '@energysage/es-ds-components/app/components/icon/video-play.vue';
import IconWifi from '@energysage/es-ds-components/app/components/icon/wifi.vue';
import IconX from '@energysage/es-ds-components/app/components/icon/x.vue';
import IconXSocial from '@energysage/es-ds-components/app/components/icon/x-social.vue';
import IconYoutube from '@energysage/es-ds-components/app/components/icon/youtube.vue';

const isDarkBackgroundActive = ref(false);
const showPhosphorName = ref(false);

const baseIcons = [
    {
        name: 'arrow clockwise',
        component: IconArrowClockwise,
        phosphorName: 'arrow-clockwise',
    },
    {
        name: 'arrow counter clockwise',
        component: IconArrowCounterClockwise,
        phosphorName: 'arrow-counter-clockwise',
    },
    {
        name: 'arrow cycle',
        component: IconArrowCycle,
        phosphorName: 'arrows-clockwise',
    },
    {
        name: 'arrow down',
        component: IconArrowDown,
        phosphorName: 'arrow-down',
    },
    {
        name: 'arrow left',
        component: IconArrowLeft,
        phosphorName: 'arrow-left',
    },
    {
        name: 'arrow right',
        component: IconArrowRight,
        phosphorName: 'arrow-right',
    },
    {
        name: 'arrow up',
        component: IconArrowUp,
        phosphorName: 'arrow-up',
    },
    {
        name: 'battery charging vertical',
        component: IconBatteryChargingVertical,
        phosphorName: 'battery-charging-vertical',
    },
    {
        name: 'bell',
        component: IconBell,
        phosphorName: 'bell',
    },
    {
        name: 'block',
        component: IconBlock,
        phosphorName: 'prohibit',
    },
    {
        name: 'bolt',
        component: IconBolt,
        phosphorName: 'lightning',
    },
    {
        name: 'calculator',
        component: IconCalculator,
        phosphorName: 'calculator',
    },
    {
        name: 'calendar',
        component: IconCalendar,
        phosphorName: 'calendar-dots',
    },
    {
        name: 'cart',
        component: IconCart,
        phosphorName: 'shopping-cart-simple',
    },
    {
        name: 'charging station',
        component: IconChargingStation,
        phosphorName: 'charging-station',
    },
    {
        name: 'chat bubble',
        component: IconChatBubble,
        phosphorName: 'chat',
    },
    {
        name: 'chat dots',
        component: IconChatDots,
        phosphorName: 'chat-dots',
    },
    {
        name: 'check',
        component: IconCheck,
        phosphorName: 'check',
    },
    {
        name: 'chevron down',
        component: IconChevronDown,
        phosphorName: 'caret-down',
    },
    {
        name: 'chevron horizontal',
        component: IconChevronHorizontal,
        phosphorName: 'code-simple',
    },
    {
        name: 'chevron left',
        component: IconChevronLeft,
        phosphorName: 'caret-left',
    },
    {
        name: 'chevron right',
        component: IconChevronRight,
        phosphorName: 'caret-right',
    },
    {
        name: 'chevron up',
        component: IconChevronUp,
        phosphorName: 'caret-up',
    },
    {
        name: 'circle',
        component: IconCircle,
        phosphorName: 'circle',
    },
    {
        name: 'circle alert',
        component: IconCircleAlert,
        phosphorName: 'warning-circle',
    },
    {
        name: 'circle check',
        component: IconCircleCheck,
        phosphorName: 'check-circle',
    },
    {
        name: 'circle minus',
        component: IconCircleMinus,
        phosphorName: 'minus-circle',
    },
    {
        name: 'circle plus',
        component: IconCirclePlus,
        phosphorName: 'plus-circle',
    },
    {
        name: 'circle chevron down',
        component: IconCircleChevronDown,
        phosphorName: 'caret-circle-down',
    },
    {
        name: 'circle chevron left',
        component: IconCircleChevronLeft,
        phosphorName: 'caret-circle-left',
    },
    {
        name: 'circle chevron right',
        component: IconCircleChevronRight,
        phosphorName: 'caret-circle-right',
    },
    {
        name: 'circle chevron up',
        component: IconCircleChevronUp,
        phosphorName: 'caret-circle-up',
    },
    {
        name: 'circle x',
        component: IconCircleX,
        phosphorName: 'x-circle',
    },
    {
        name: 'clock',
        component: IconClock,
        phosphorName: 'clock',
    },
    {
        name: 'copy',
        component: IconCopy,
        phosphorName: 'copy-simple',
    },
    {
        name: 'envelope',
        component: IconEnvelope,
        phosphorName: 'envelope',
    },
    {
        name: 'eye',
        component: IconEye,
        phosphorName: 'eye',
    },
    {
        name: 'folder',
        component: IconFolder,
        phosphorName: 'folder',
    },
    {
        name: 'flag',
        component: IconFlag,
        phosphorName: 'flag',
    },
    {
        name: 'gear',
        component: IconGear,
        phosphorName: 'gear',
    },
    {
        name: 'hamburger',
        component: IconHamburger,
        phosphorName: 'list',
    },
    {
        name: 'heart',
        component: IconHeart,
        phosphorName: 'heart',
    },
    {
        name: 'house line',
        component: IconHouseLine,
        phosphorName: 'house-line',
    },
    {
        name: 'image',
        component: IconImage,
        phosphorName: 'image-square',
    },
    {
        name: 'info',
        component: IconInfo,
        phosphorName: 'info',
    },
    {
        name: 'light bulb',
        component: IconLightBulb,
        phosphorName: 'lightbulb',
    },
    {
        name: 'link out',
        component: IconLinkOut,
        phosphorName: 'arrow-square-out',
    },
    {
        name: 'location',
        component: IconLocation,
        phosphorName: 'map-pin',
    },
    {
        name: 'lock off',
        component: IconLockOff,
        phosphorName: 'lock-open',
    },
    {
        name: 'lock on',
        component: IconLockOn,
        phosphorName: 'lock',
    },
    {
        name: 'minus',
        component: IconMinus,
        phosphorName: 'minus',
    },
    {
        name: 'money bag',
        component: IconMoneyBag,
        phosphorName: 'money',
    },
    {
        name: 'open envelope',
        component: IconOpenEnvelope,
        phosphorName: 'envelope-open',
    },
    {
        name: 'paper',
        component: IconPaper,
        phosphorName: 'file',
    },
    {
        name: 'pencil',
        component: IconPencil,
        phosphorName: 'pencil-simple',
    },
    {
        name: 'person',
        component: IconPerson,
        phosphorName: 'user',
    },
    {
        name: 'person add',
        component: IconPersonAdd,
        phosphorName: 'user-plus',
    },
    {
        name: 'person check',
        component: IconPersonCheck,
        phosphorName: 'user-check',
    },
    {
        name: 'person cross',
        component: IconPersonCross,
        phosphorName: 'user-minus',
    },
    {
        name: 'phone',
        component: IconPhone,
        phosphorName: 'phone',
    },
    {
        name: 'play',
        component: IconPlay,
        phosphorName: 'play',
    },
    {
        name: 'plus',
        component: IconPlus,
        phosphorName: 'plus',
    },
    {
        name: 'roof',
        component: IconRoof,
        phosphorName: 'solar-roof',
    },
    {
        name: 'search',
        component: IconSearch,
        phosphorName: 'magnifying-glass',
    },
    {
        name: 'settings horizontal',
        component: IconSettingsHorizontal,
        phosphorName: 'sliders-horizontal',
    },
    {
        name: 'settings vertical',
        component: IconSettingsVertical,
        phosphorName: 'sliders',
    },
    {
        name: 'shield',
        component: IconShield,
        phosphorName: 'shield',
    },
    {
        name: 'shield with check',
        component: IconShieldWithCheck,
        phosphorName: 'shield-check',
    },
    {
        name: 'shopping bag',
        component: IconShoppingBag,
        phosphorName: 'shopping-bag',
    },
    {
        name: 'solar',
        component: IconSolar,
        phosphorName: 'solar-panel',
    },
    {
        name: 'sound down',
        component: IconSoundDown,
        phosphorName: 'speaker-low',
    },
    {
        name: 'sound off',
        component: IconSoundOff,
        phosphorName: 'speaker-x',
    },
    {
        name: 'sound on',
        component: IconSoundOn,
        phosphorName: 'speaker-none',
    },
    {
        name: 'sound up',
        component: IconSoundUp,
        phosphorName: 'speaker-high',
    },
    {
        name: 'thumbs up',
        component: IconThumbsUp,
        phosphorName: 'thumbs-up',
    },
    {
        name: 'trash can',
        component: IconTrashCan,
        phosphorName: 'trash',
    },
    {
        name: 'tree',
        component: IconTree,
        phosphorName: 'tree',
    },
    {
        name: 'upload',
        component: IconUpload,
        phosphorName: 'upload-simple',
    },
    {
        name: 'verified',
        component: IconVerified,
        phosphorName: 'seal-check',
    },
    {
        name: 'wifi',
        component: IconWifi,
        phosphorName: 'wifi-high',
    },
    {
        name: 'x',
        component: IconX,
        phosphorName: 'x',
    },
].sort((a, b) => a.name.localeCompare(b.name));

const baseIconsNotPhosphor = [
    {
        name: 'chat add',
        component: IconChatAdd,
    },
    {
        name: 'chat approve',
        component: IconChatApprove,
    },
    {
        name: 'ES leaf',
        component: IconEsLeaf,
    },
].sort((a, b) => a.name.localeCompare(b.name));

const ratingStarIcons = [
    {
        name: 'star empty',
        component: IconStarEmpty,
        phosphorName: 'star',
    },
    {
        name: 'star full',
        component: IconStarFull,
        phosphorName: 'star',
    },
    {
        name: 'star half',
        component: IconStarHalf,
        phosphorName: 'star-half',
    },
].sort((a, b) => a.name.localeCompare(b.name));

const marketingIcons = [
    {
        name: 'bank',
        component: IconBank,
    },
    {
        name: 'battery',
        component: IconBattery,
    },
    {
        name: 'business',
        component: IconBusiness,
    },
    {
        name: 'community solar',
        component: IconCommunitySolar,
    },
    {
        name: 'companies',
        component: IconCompanies,
    },
    {
        name: 'contact us',
        component: IconContactUs,
    },
    {
        name: 'credit card',
        component: IconCreditCard,
    },
    {
        name: 'document',
        component: IconDocument,
    },
    {
        name: 'electricity circle',
        component: IconElectricityCircle,
    },
    {
        name: 'electric vehicle',
        component: IconElectricVehicle,
    },
    {
        name: 'gift',
        component: IconGift,
    },
    {
        name: 'heat pump',
        component: IconHeatPump,
    },
    {
        name: 'info blog post',
        component: IconInfoBlogPost,
    },
    {
        name: 'marketplace',
        component: IconMarketplace,
    },
    {
        name: 'money',
        component: IconMoney,
    },
    {
        name: 'payback',
        component: IconPayback,
    },
    {
        name: 'rooftop solar',
        component: IconRooftopSolar,
    },
    {
        name: 'saving',
        component: IconSaving,
    },
].sort((a, b) => a.name.localeCompare(b.name));

const socialIcons = [
    {
        name: 'bluesky',
        component: IconBluesky,
    },
    {
        name: 'facebook',
        component: IconFacebook,
    },
    {
        name: 'instagram',
        component: IconInstagram,
    },
    {
        name: 'linkedin',
        component: IconLinkedin,
    },
    {
        name: 'threads',
        component: IconThreads,
    },
    {
        name: 'x social',
        component: IconXSocial,
    },
    {
        name: 'youtube',
        component: IconYoutube,
    },
].sort((a, b) => a.name.localeCompare(b.name));

const deprecatedSocialIcons = [
    {
        name: 'twitter',
        component: IconTwitter,
    },
];

const fileIcons = [
    {
        name: 'file doc',
        component: IconFileDoc,
    },
    {
        name: 'file docx',
        component: IconFileDocx,
    },
    {
        name: 'file pdf',
        component: IconFilePdf,
    },
].sort((a, b) => a.name.localeCompare(b.name));

const stateIcons = [
    {
        name: 'state ak',
        component: IconStateAk,
    },
    {
        name: 'state al',
        component: IconStateAl,
    },
    {
        name: 'state ar',
        component: IconStateAr,
    },
    {
        name: 'state az',
        component: IconStateAz,
    },
    {
        name: 'state ca',
        component: IconStateCa,
    },
    {
        name: 'state co',
        component: IconStateCo,
    },
    {
        name: 'state ct',
        component: IconStateCt,
    },
    {
        name: 'state dc',
        component: IconStateDc,
    },
    {
        name: 'state de',
        component: IconStateDe,
    },
    {
        name: 'state fl',
        component: IconStateFl,
    },
    {
        name: 'state ga',
        component: IconStateGa,
    },
    {
        name: 'state hi',
        component: IconStateHi,
    },
    {
        name: 'state ia',
        component: IconStateIa,
    },
    {
        name: 'state id',
        component: IconStateId,
    },
    {
        name: 'state il',
        component: IconStateIl,
    },
    {
        name: 'state in',
        component: IconStateIn,
    },
    {
        name: 'state ks',
        component: IconStateKs,
    },
    {
        name: 'state ky',
        component: IconStateKy,
    },
    {
        name: 'state la',
        component: IconStateLa,
    },
    {
        name: 'state ma',
        component: IconStateMa,
    },
    {
        name: 'state md',
        component: IconStateMd,
    },
    {
        name: 'state me',
        component: IconStateMe,
    },
    {
        name: 'state mi',
        component: IconStateMi,
    },
    {
        name: 'state mn',
        component: IconStateMn,
    },
    {
        name: 'state mo',
        component: IconStateMo,
    },
    {
        name: 'state ms',
        component: IconStateMs,
    },
    {
        name: 'state mt',
        component: IconStateMt,
    },
    {
        name: 'state nc',
        component: IconStateNc,
    },
    {
        name: 'state nd',
        component: IconStateNd,
    },
    {
        name: 'state ne',
        component: IconStateNe,
    },
    {
        name: 'state nh',
        component: IconStateNh,
    },
    {
        name: 'state nj',
        component: IconStateNj,
    },
    {
        name: 'state nm',
        component: IconStateNm,
    },
    {
        name: 'state nv',
        component: IconStateNv,
    },
    {
        name: 'state ny',
        component: IconStateNy,
    },
    {
        name: 'state oh',
        component: IconStateOh,
    },
    {
        name: 'state ok',
        component: IconStateOk,
    },
    {
        name: 'state or',
        component: IconStateOr,
    },
    {
        name: 'state pa',
        component: IconStatePa,
    },
    {
        name: 'state ri',
        component: IconStateRi,
    },
    {
        name: 'state sc',
        component: IconStateSc,
    },
    {
        name: 'state sd',
        component: IconStateSd,
    },
    {
        name: 'state tn',
        component: IconStateTn,
    },
    {
        name: 'state tx',
        component: IconStateTx,
    },
    {
        name: 'state ut',
        component: IconStateUt,
    },
    {
        name: 'state va',
        component: IconStateVa,
    },
    {
        name: 'state vt',
        component: IconStateVt,
    },
    {
        name: 'state wa',
        component: IconStateWa,
    },
    {
        name: 'state wi',
        component: IconStateWi,
    },
    {
        name: 'state wv',
        component: IconStateWv,
    },
    {
        name: 'state wy',
        component: IconStateWy,
    },
].sort((a, b) => a.name.localeCompare(b.name));

const videoPlayIcons = [
    {
        name: 'video play',
        component: IconVideoPlay,
    },
];

const docCode = ref('');
const { $prism } = useNuxtApp();
onMounted(async () => {
    if ($prism) {
        const docSource = await import('./icons.vue?raw');

        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Icons</h1>

        <p>
            The base and rating star icons are from the open-source
            <a
                href="https://phosphoricons.com/"
                target="_blank"
                >Phosphor icon library</a
            >. All others were sourced elsewhere or created by our design team.
        </p>

        <div class="d-flex flex-wrap mb-100">
            <es-toggle
                v-model="isDarkBackgroundActive"
                class="mr-300">
                <template #label> View against dark background </template>
            </es-toggle>
            <es-toggle v-model="showPhosphorName">
                <template #label> Show Phosphor icon name </template>
            </es-toggle>
        </div>

        <div class="mb-300">
            <h2 class="mt-300">Base icons</h2>
            <p>
                The default size of base icons is 24px by 24px, but you can change that by passing in
                <code>height</code> and <code>width</code> props.
            </p>
            <ds-icon-list
                :icons="baseIcons"
                :is-dark-background-active="isDarkBackgroundActive"
                :show-phosphor-name="showPhosphorName" />
        </div>

        <div class="mb-300">
            <h3 class="mt-300">Base icons not yet transitioned to Phosphor</h3>
            <p>These are candidates for removal and are the subject of active conversations on the design team.</p>
            <ds-icon-list
                :icons="baseIconsNotPhosphor"
                :is-dark-background-active="isDarkBackgroundActive"
                :show-phosphor-name="showPhosphorName" />
        </div>

        <div class="mb-300">
            <h2 class="mt-300">Rating stars</h2>
            <p>The default size of rating star icons is 20px by 20px.</p>
            <ds-icon-list
                :icons="ratingStarIcons"
                :is-dark-background-active="isDarkBackgroundActive"
                :show-phosphor-name="showPhosphorName" />
        </div>

        <div class="mb-300">
            <h2 class="mt-300">Marketing icons</h2>
            <p>The default size of marketing icons is 32px by 32px.</p>
            <ds-icon-list
                :icons="marketingIcons"
                :is-dark-background-active="isDarkBackgroundActive"
                :show-phosphor-name="showPhosphorName" />
        </div>

        <div class="mb-300">
            <h2 class="mt-300">Social icons</h2>
            <p>The default size of social icons is 32px by 32px.</p>
            <ds-icon-list
                :icons="socialIcons"
                :is-dark-background-active="isDarkBackgroundActive"
                :show-phosphor-name="showPhosphorName" />
            <p>The following icons are deprecated and have been renamed.</p>
            <ds-icon-list
                :icons="deprecatedSocialIcons"
                :is-dark-background-active="isDarkBackgroundActive"
                :show-phosphor-name="showPhosphorName" />
        </div>

        <div class="mb-300">
            <h2 class="mt-300">File icons</h2>
            <p>The default size of file icons is 56px by 73px.</p>
            <ds-icon-list
                :icons="fileIcons"
                :is-dark-background-active="isDarkBackgroundActive"
                :show-phosphor-name="showPhosphorName" />
        </div>

        <div class="mb-300">
            <h2 class="mt-300">State icons</h2>
            <p>The default size of state icons is 24px by 24px.</p>
            <ds-icon-list
                :icons="stateIcons"
                :is-dark-background-active="isDarkBackgroundActive"
                :show-phosphor-name="showPhosphorName" />
        </div>

        <div class="mb-300">
            <h2 class="mt-300">Video play icon</h2>
            <p>
                The default size of the video play icon is 74px by 54px. It will take the text color of its container,
                but at 50% opacity. The triangle in the middle has a hardcoded white fill.
            </p>
            <ds-icon-list
                :icons="videoPlayIcons"
                :is-dark-background-active="isDarkBackgroundActive"
                :show-phosphor-name="showPhosphorName" />
        </div>

        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-ds-docs/atoms/icons.vue" />
    </div>
</template>
