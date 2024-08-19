<template>
    <div>
        <h1>
            Icons
        </h1>
        <div class="mb-300">
            <p>
                These icons are designed to work with design system components. Their size can be adjusted by passing
                in <code>height</code> and <code>width</code> parameters. By default, icons will take the font color of
                the container in which they're placed. To change their color, simply place the appropriate
                <code>text-{xxx}</code> utility class on their containing element.
            </p>
            <p>Select an option to see how the icons look with that color applied.</p>
            <es-radio-button
                v-for="color in colorOptions"
                v-model="activeColor"
                :display-name="color.text"
                :value="color.value"
                inline />
        </div>
        <h2>
            Base Icons
        </h2>
        <p>
            Default size for base icons is 24px by 24px.
        </p>
        <ul
            class="ds-icon-list m-0 mb-300 p-0"
            :class="{ [ textColorClass() ]: true }">
            <li>
                <icon-arrow-clockwise />
                <code>IconArrowClockwise</code>
            </li>
            <li>
                <icon-arrow-counter-clockwise />
                <code>IconArrowCounterClockwise</code>
            </li>
            <li>
                <icon-arrow-cycle />
                <code>IconArrowCycle</code>
            </li>
            <li>
                <icon-arrow-left />
                <code>IconArrowLeft</code>
            </li>
            <li>
                <icon-arrow-right />
                <code>IconArrowRight</code>
            </li>
            <li>
                <icon-arrow-up />
                <code>IconArrowUp</code>
            </li>
            <li>
                <icon-arrow />
                <code>IconArrow</code>
            </li>
            <li>
                <icon-bell />
                <code>IconBell</code>
            </li>
            <li>
                <icon-block />
                <code>IconBlock</code>
            </li>
            <li>
                <icon-bolt />
                <code>IconBolt</code>
            </li>
            <li>
                <icon-calculator />
                <code>IconCalculator</code>
            </li>
            <li>
                <icon-calendar />
                <code>IconCalendar</code>
            </li>
            <li>
                <icon-cart />
                <code>IconCart</code>
            </li>
            <li>
                <icon-chat-add />
                <code>IconChatAdd</code>
            </li>
            <li>
                <icon-chat-approve />
                <code>IconChatApprove</code>
            </li>
            <li>
                <icon-chat-bubble />
                <code>IconChatBubble</code>
            </li>
            <li>
                <icon-chat-dots />
                <code>IconChatDots</code>
            </li>
            <li>
                <icon-check />
                <code>IconCheck</code>
            </li>
            <li>
                <icon-chevron-down />
                <code>IconChevronDown</code>
            </li>
            <li>
                <icon-chevron-horizontal />
                <code>IconChevronHorizontal</code>
            </li>
            <li>
                <icon-chevron-left />
                <code>IconChevronLeft</code>
            </li>
            <li>
                <icon-chevron-right />
                <code>IconChevronRight</code>
            </li>
            <li>
                <icon-chevron-up />
                <code>IconChevronUp</code>
            </li>
            <li>
                <icon-circle-alert />
                <code>IconCircleAlert</code>
            </li>
            <li>
                <icon-circle-check />
                <code>IconCircleCheck</code>
            </li>
            <li>
                <icon-circle-chevron-down />
                <code>IconCircleChevronDown</code>
            </li>
            <li>
                <icon-circle-chevron-left />
                <code>IconCircleChevronLeft</code>
            </li>
            <li>
                <icon-circle-chevron-right />
                <code>IconCircleChevronRight</code>
            </li>
            <li>
                <icon-circle-chevron-up />
                <code>IconCircleChevronUp</code>
            </li>
            <li>
                <icon-circle-minus />
                <code>IconCircleMinus</code>
            </li>
            <li>
                <icon-circle-plus />
                <code>IconCirclePlus</code>
            </li>
            <li>
                <icon-circle-x />
                <code>IconCircleX</code>
            </li>
            <li>
                <icon-circle />
                <code>IconCircle</code>
            </li>
            <li>
                <icon-clock />
                <code>IconClock</code>
            </li>
            <li>
                <icon-copy />
                <code>IconCopy</code>
            </li>
            <li>
                <icon-envelope />
                <code>IconEnvelope</code>
            </li>
            <li>
                <icon-es-leaf />
                <code>IconESLeaf</code>
            </li>
            <li>
                <icon-eye />
                <code>IconEye</code>
            </li>
            <li>
                <icon-folder />
                <code>IconFolder</code>
            </li>
            <li>
                <icon-flag />
                <code>IconFlag</code>
            </li>
            <li>
                <icon-gear />
                <code>IconGear</code>
            </li>
            <li>
                <icon-hamburger />
                <code>IconHamburger</code>
            </li>
            <li>
                <icon-heart />
                <code>IconHeart</code>
            </li>
            <li>
                <icon-image />
                <code>IconImage</code>
            </li>
            <li>
                <icon-info />
                <code>IconInfo</code>
            </li>
            <li>
                <icon-light-bulb />
                <code>IconLightBulb</code>
            </li>
            <li>
                <icon-link-out />
                <code>IconLinkOut</code>
            </li>
            <li>
                <icon-location />
                <code>IconLocation</code>
            </li>
            <li>
                <icon-lock-off />
                <code>IconLockOff</code>
            </li>
            <li>
                <icon-lock-on />
                <code>IconLockOn</code>
            </li>
            <li>
                <icon-minus />
                <code>IconMinus</code>
            </li>
            <li>
                <icon-money-bag />
                <code>IconMoneyBag</code>
            </li>
            <li>
                <icon-open-envelope />
                <code>IconOpenEnvelope</code>
            </li>
            <li>
                <icon-paper />
                <code>IconPaper</code>
            </li>
            <li>
                <icon-pencil />
                <code>IconPencil</code>
            </li>
            <li>
                <icon-person-add />
                <code>IconPersonAdd</code>
            </li>
            <li>
                <icon-person-check />
                <code>IconPersonCheck</code>
            </li>
            <li>
                <icon-person-cross />
                <code>IconPersonCross</code>
            </li>
            <li>
                <icon-person />
                <code>IconPerson</code>
            </li>
            <li>
                <icon-phone />
                <code>IconPhone</code>
            </li>
            <li>
                <icon-play />
                <code>IconPlay</code>
            </li>
            <li>
                <icon-plus />
                <code>IconPlus</code>
            </li>
            <li>
                <icon-roof />
                <code>IconRoof</code>
            </li>
            <li>
                <icon-search />
                <code>IconSearch</code>
            </li>
            <li>
                <icon-settings-horizontal />
                <code>IconSettingsHorizontal</code>
            </li>
            <li>
                <icon-settings-vertical />
                <code>IconSettingsVertical</code>
            </li>
            <li>
                <icon-shield />
                <code>IconShield</code>
            </li>
            <li>
                <icon-shield-with-check />
                <code>IconShieldWithCheck</code>
            </li>
            <li>
                <icon-shopping-bag />
                <code>IconShoppingBag</code>
            </li>
            <li>
                <icon-solar />
                <code>IconSolar</code>
            </li>
            <li>
                <icon-sound-down />
                <code>IconSoundDown</code>
            </li>
            <li>
                <icon-sound-off />
                <code>IconSoundOff</code>
            </li>
            <li>
                <icon-sound-on />
                <code>IconSoundOn</code>
            </li>
            <li>
                <icon-sound-up />
                <code>IconSoundUp</code>
            </li>
            <li>
                <icon-thumbs-up />
                <code>IconThumbsUp</code>
            </li>
            <li>
                <icon-trash-can />
                <code>IconTrashCan</code>
            </li>
            <li>
                <icon-tree />
                <code>IconTree</code>
            </li>
            <li>
                <icon-upload />
                <code>IconUpload</code>
            </li>
            <li>
                <icon-verified />
                <code>IconVerified</code>
            </li>
            <li>
                <icon-wifi />
                <code>IconWifi</code>
            </li>
            <li>
                <icon-x />
                <code>IconX</code>
            </li>
        </ul>

        <h2>
            Rating Star Icons
        </h2>
        <p>
            Default size for rating star icons is 20px by 20px.
        </p>
        <ul
            class="ds-icon-list m-0 mb-300 p-0"
            :class="{ [ textColorClass() ]: true }">
            <li>
                <icon-star-empty />
                <code>IconStarEmpty</code>
            </li>
            <li>
                <icon-star-full />
                <code>IconStarFull</code>
            </li>
            <li>
                <icon-star-half />
                <code>IconStarHalf</code>
            </li>
        </ul>

        <h2>
            Marketing Icons
        </h2>
        <p>
            Default size for marketing icons is 32px by 32px.
        </p>
        <ul
            class="ds-icon-list m-0 mb-300 p-0"
            :class="{ [ textColorClass() ]: true }">
            <li>
                <icon-bank />
                <code>IconBank</code>
            </li>
            <li>
                <icon-battery />
                <code>IconBattery</code>
            </li>
            <li>
                <icon-business />
                <code>IconBusiness</code>
            </li>
            <li>
                <icon-community-solar />
                <code>IconCommunitySolar</code>
            </li>
            <li>
                <icon-companies />
                <code>IconCompanies</code>
            </li>
            <li>
                <icon-contact-us />
                <code>IconContactUs</code>
            </li>
            <li>
                <icon-credit-card />
                <code>IconCreditCard</code>
            </li>
            <li>
                <icon-document />
                <code>IconDocument</code>
            </li>
            <li>
                <icon-electricity-circle />
                <code>IconElectricityCircle</code>
            </li>
            <li>
                <icon-electric-vehicle />
                <code>IconElectricVehicle</code>
            </li>
            <li>
                <icon-gift />
                <code>IconGift</code>
            </li>
            <li>
                <icon-heat-pump />
                <code>IconHeatPump</code>
            </li>
            <li>
                <icon-info-blog-post />
                <code>IconInfoBlogPost</code>
            </li>
            <li>
                <icon-marketplace />
                <code>IconMarketplace</code>
            </li>
            <li>
                <icon-money />
                <code>IconMoney</code>
            </li>
            <li>
                <icon-payback />
                <code>IconPayback</code>
            </li>
            <li>
                <icon-rooftop-solar />
                <code>IconRooftopSolar</code>
            </li>
            <li>
                <icon-saving />
                <code>IconSaving</code>
            </li>
        </ul>

        <h2>
            Social Icons
        </h2>
        <p>
            Default size for social icons is 31px wide by 32px tall.
        </p>
        <ul
            class="ds-icon-list m-0 mb-300 p-0"
            :class="{ [ textColorClass() ]: true }">
            <li>
                <icon-facebook />
                <code>IconFacebook</code>
            </li>
            <li>
                <icon-instagram />
                <code>IconInstagram</code>
            </li>
            <li>
                <icon-linkedin />
                <code>IconLinkedin</code>
            </li>
            <li>
                <icon-twitter />
                <code>IconTwitter</code>
            </li>
            <li>
                <icon-youtube />
                <code>IconYoutube</code>
            </li>
        </ul>

        <h2>
            File Icons
        </h2>
        <p>
            Default size for file icons is 56px by 73px.
        </p>
        <ul
            class="ds-icon-list m-0 mb-300 p-0"
            :class="{ [ textColorClass() ]: true }">
            <li>
                <icon-file-doc />
                <code>IconFileDoc</code>
            </li>
            <li>
                <icon-file-docx />
                <code>IconFileDocx</code>
            </li>
            <li>
                <icon-file-pdf />
                <code>IconFilePdf</code>
            </li>
        </ul>

        <h2>
            State Icons
        </h2>
        <p>
            Default size for state icons is 24px by 24px.
        </p>
        <ul
            class="ds-icon-list m-0 mb-300 p-0"
            :class="{ [ textColorClass() ]: true }">
            <li>
                <icon-state-ak />
                <code>IconStateAk</code>
            </li>
            <li>
                <icon-state-al />
                <code>IconStateAl</code>
            </li>
            <li>
                <icon-state-ar />
                <code>IconStateAr</code>
            </li>
            <li>
                <icon-state-az />
                <code>IconStateAz</code>
            </li>
            <li>
                <icon-state-ca />
                <code>IconStateCa</code>
            </li>
            <li>
                <icon-state-co />
                <code>IconStateCo</code>
            </li>
            <li>
                <icon-state-ct />
                <code>IconStateCt</code>
            </li>
            <li>
                <icon-state-dc />
                <code>IconStateDc</code>
            </li>
            <li>
                <icon-state-de />
                <code>IconStateDe</code>
            </li>
            <li>
                <icon-state-fl />
                <code>IconStateFl</code>
            </li>
            <li>
                <icon-state-ga />
                <code>IconStateGa</code>
            </li>
            <li>
                <icon-state-hi />
                <code>IconStateHi</code>
            </li>
            <li>
                <icon-state-ia />
                <code>IconStateIa</code>
            </li>
            <li>
                <icon-state-id />
                <code>IconStateId</code>
            </li>
            <li>
                <icon-state-il />
                <code>IconStateIl</code>
            </li>
            <li>
                <icon-state-in />
                <code>IconStateIn</code>
            </li>
            <li>
                <icon-state-ks />
                <code>IconStateKs</code>
            </li>
            <li>
                <icon-state-ky />
                <code>IconStateKy</code>
            </li>
            <li>
                <icon-state-la />
                <code>IconStateLa</code>
            </li>
            <li>
                <icon-state-ma />
                <code>IconStateMa</code>
            </li>
            <li>
                <icon-state-md />
                <code>IconStateMd</code>
            </li>
            <li>
                <icon-state-me />
                <code>IconStateMe</code>
            </li>
            <li>
                <icon-state-mi />
                <code>IconStateMi</code>
            </li>
            <li>
                <icon-state-mn />
                <code>IconStateMn</code>
            </li>
            <li>
                <icon-state-mo />
                <code>IconStateMo</code>
            </li>
            <li>
                <icon-state-ms />
                <code>IconStateMs</code>
            </li>
            <li>
                <icon-state-mt />
                <code>IconStateMt</code>
            </li>
            <li>
                <icon-state-nc />
                <code>IconStateNc</code>
            </li>
            <li>
                <icon-state-nd />
                <code>IconStateNd</code>
            </li>
            <li>
                <icon-state-ne />
                <code>IconStateNe</code>
            </li>
            <li>
                <icon-state-nh />
                <code>IconStateNh</code>
            </li>
            <li>
                <icon-state-nj />
                <code>IconStateNj</code>
            </li>
            <li>
                <icon-state-nm />
                <code>IconStateNm</code>
            </li>
            <li>
                <icon-state-nv />
                <code>IconStateNv</code>
            </li>
            <li>
                <icon-state-ny />
                <code>IconStateNy</code>
            </li>
            <li>
                <icon-state-oh />
                <code>IconStateOh</code>
            </li>
            <li>
                <icon-state-ok />
                <code>IconStateOk</code>
            </li>
            <li>
                <icon-state-or />
                <code>IconStateOr</code>
            </li>
            <li>
                <icon-state-pa />
                <code>IconStatePa</code>
            </li>
            <li>
                <icon-state-ri />
                <code>IconStateRi</code>
            </li>
            <li>
                <icon-state-sc />
                <code>IconStateSc</code>
            </li>
            <li>
                <icon-state-sd />
                <code>IconStateSd</code>
            </li>
            <li>
                <icon-state-tn />
                <code>IconStateTn</code>
            </li>
            <li>
                <icon-state-tx />
                <code>IconStateTx</code>
            </li>
            <li>
                <icon-state-ut />
                <code>IconStateUt</code>
            </li>
            <li>
                <icon-state-va />
                <code>IconStateVa</code>
            </li>
            <li>
                <icon-state-vt />
                <code>IconStateVt</code>
            </li>
            <li>
                <icon-state-wa />
                <code>IconStateWa</code>
            </li>
            <li>
                <icon-state-wi />
                <code>IconStateWi</code>
            </li>
            <li>
                <icon-state-wv />
                <code>IconStateWv</code>
            </li>
            <li>
                <icon-state-wy />
                <code>IconStateWy</code>
            </li>
        </ul>
        <h2>
            Miscellaneous Icons
        </h2>
        <ul
            class="ds-icon-list m-0 mb-300 p-0"
            :class="{ [ textColorClass() ]: true }">
            <li>
                <icon-video-play />
                <code>IconVideoPlay</code>
            </li>
        </ul>

        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-ds-docs/atoms/icons.vue" />
    </div>
</template>

<script setup lang="ts">
import sassIconColors from '@energysage/es-ds-styles/scss/modules/icon-colors.module.scss';

const colorNames = Object.keys(sassIconColors)
    .map((k) => k)
    .reduce((prev, cur) => {
        // eslint-disable-next-line no-param-reassign
        prev[cur] = cur;
        return prev;
    }, {});

const colorOptions = Object.keys(colorNames).map((k) => ({
    text: k === 'body' ? 'default' : k.replace('-', ' '),
    value: k,
}));

let activeColor = ref(colorNames.body);

const textColorClass = () => {
    return `text-${activeColor.value}`;
};

const docCode = ref('');

const { $prism } = useNuxtApp();

if ($prism) {
    /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
    const docSource = await import('./icons.vue?raw');
    /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}

</script>

<style lang="scss" scoped>
@use "@energysage/es-ds-styles/scss/variables" as variables;
@use "@energysage/es-ds-styles/scss/mixins/breakpoints" as breakpoints;

.ds-icon-list {
    list-style: none;
}

.ds-icon-list li {
    align-items: center;
    /* avoid break inside so Safari renders things properly */
    break-inside: avoid;
    -webkit-column-break-inside: avoid;
    /* so we don't have to repeat the utility classes many times */
    display: flex;
    padding: 0.5rem 0;
    page-break-inside: avoid;
}

.ds-icon-list code {
    /* so we don't have to repeat the utility classes many times */
    color: variables.$body-color;
    margin-left: 0.5rem;
}

@include breakpoints.media-breakpoint-up(sm) {
    .ds-icon-list {
        column-count: 2;
    }
}

@include breakpoints.media-breakpoint-up(lg) {
    .ds-icon-list {
        column-count: 3;
    }
}

@include breakpoints.media-breakpoint-up(xl) {
    .ds-icon-list {
        column-count: 4;
    }
}

@include breakpoints.media-breakpoint-up(xxl) {
    .ds-icon-list {
        column-count: 5;
    }
}
</style>
