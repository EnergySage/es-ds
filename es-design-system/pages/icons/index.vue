<template>
    <div class="container">
        <div class="row">
            <div class="col mt-4">
                <ul class="ds-icon-list m-0 p-0">
                    <li>
                        <IconArrowClockwise
                            :style="{color: themeHexVal}"
                            :orientation="orientationSelected" />
                    </li>
                    <li>
                        <IconArrowCycle :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconArrow
                            :style="{color: themeHexVal}"
                            :orientation="orientationTopRightDownLeftSelected" />
                    </li>
                    <li>
                        <IconTrashCan :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconThumbsUp :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconSoundUp :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconSoundOn :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconSoundOff :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconSoundDown :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconShoppingBag :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconShield :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconSettingsVertical :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconSettingsHorizontal :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconPlus :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconPlay :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconPhone :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconPerson :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconPersonCross :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconPersonCheck :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconPersonAdd :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconPencil :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconPaper :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconOpenEnvelope :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconMinus :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconLockOn :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconLockOff :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconLocation :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconLinkOut :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconInfo :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconImage :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconHeart :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconFolder :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconEye :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconEnvelope :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconCopy :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconClock :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconCircle :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconCircleX :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconCirclePlus :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconCircleMinus :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconCircleChevronUp :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconCircleChevronRight :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconCircleChevronLeft :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconCircleChevronDown :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconCircleCheck :style="{color: themeHexVal}" />
                    </li>

                    <li>
                        <IconCircleAlert :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconChevronUp :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconChevronRight :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconChevronLeft :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconChevronHorizontal :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconChevronDown :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconCheck :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconChatDots :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconChatBubble :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconChatApprove :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconChatAdd :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconCart :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconCalendar :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconBlock :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconWifi :style="{color: themeHexVal}" />
                    </li>
                    <li>
                        <IconBell :style="{color: themeHexVal}" />
                    </li>
                </ul>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <hr>
            </div>
        </div>

        <div class="row">
            <div class="col-12 mt-4 mb-4">
                <h2>
                    Theme Colors
                </h2>
                <b-form-group label="Radios using options">
                    <b-form-radio-group
                        id="radio-group-1"
                        v-model="themeColorSelected"
                        :options="themeColorOptions"
                        name="radio-theme-color" />
                </b-form-group>
            </div>
            <div class="col">
                <h2>
                    Orientation
                </h2>
                <b-form-group label="Radios using options">
                    <b-form-radio-group
                        id="radio-group-2"
                        v-model="orientationSelected"
                        :options="orientationOptions"
                        name="radio-orientation" />
                </b-form-group>
            </div>
            <div class="col">
                <h2>
                    Orientation (Top, Right, Bottom, Left)
                </h2>
                <b-form-group label="Radios using options">
                    <b-form-radio-group
                        id="radio-group-3"
                        v-model="orientationTopRightDownLeftSelected"
                        :options="orientationTopRightDownLeftOptions"
                        name="radio-orientation-top-right-bottom-left" />
                </b-form-group>
            </div>
        </div>
    </div>
</template>

<script>
import sassThemeColors from '@energysage/es-bs-extends/scss/variables/_theme-colors.scss';
import { BFormGroup, BFormRadioGroup } from 'bootstrap-vue';
import {
    IconArrowClockwise,
    IconArrowCycle,
    IconArrow,
    IconWifi,
    IconBell,
    IconTrashCan,
    IconThumbsUp,
    IconSoundUp,
    IconSoundOn,
    IconSoundOff,
    IconSoundDown,
    IconShoppingBag,
    IconShield,
    IconSettingsVertical,
    IconSettingsHorizontal,
    IconPlus,
    IconPlay,
    IconPhone,
    IconPerson,
    IconPersonCross,
    IconPersonCheck,
    IconPersonAdd,
    IconPencil,
    IconPaper,
    IconOpenEnvelope,
    IconMinus,
    IconLockOn,
    IconLockOff,
    IconLocation,
    IconLinkOut,
    IconInfo,
    IconImage,
    IconHeart,
    IconFolder,
    IconEye,
    IconEnvelope,
    IconCopy,
    IconClock,
    IconCircle,
    IconCircleX,
    IconCirclePlus,
    IconCircleMinus,
    IconCircleChevronUp,
    IconCircleChevronRight,
    IconCircleChevronLeft,
    IconCircleChevronDown,
    IconCircleCheck,
    IconCircleAlert,
    IconChevronUp,
    IconChevronRight,
    IconChevronLeft,
    IconChevronHorizontal,
    IconChevronDown,
    IconCheck,
    IconChatDots,
    IconChatBubble,
    IconChatApprove,
    IconChatAdd,
    IconCart,
    IconCalendar,
    IconBlock,
} from '@energysage/es-vue-base';

export default {
    name: 'IconsListView',
    components: {
        BFormGroup,
        BFormRadioGroup,
        IconArrowClockwise,
        IconArrowCycle,
        IconArrow,
        IconWifi,
        IconBell,
        IconTrashCan,
        IconThumbsUp,
        IconSoundUp,
        IconSoundOn,
        IconSoundOff,
        IconSoundDown,
        IconShoppingBag,
        IconShield,
        IconSettingsVertical,
        IconSettingsHorizontal,
        IconPlus,
        IconPlay,
        IconPhone,
        IconPerson,
        IconPersonCross,
        IconPersonCheck,
        IconPersonAdd,
        IconPencil,
        IconPaper,
        IconOpenEnvelope,
        IconMinus,
        IconLockOn,
        IconLockOff,
        IconLocation,
        IconLinkOut,
        IconInfo,
        IconImage,
        IconHeart,
        IconFolder,
        IconEye,
        IconEnvelope,
        IconCopy,
        IconClock,
        IconCircle,
        IconCircleX,
        IconCirclePlus,
        IconCircleMinus,
        IconCircleChevronUp,
        IconCircleChevronRight,
        IconCircleChevronLeft,
        IconCircleChevronDown,
        IconCircleCheck,
        IconCircleAlert,
        IconChevronUp,
        IconChevronRight,
        IconChevronLeft,
        IconChevronHorizontal,
        IconChevronDown,
        IconCheck,
        IconChatDots,
        IconChatBubble,
        IconChatApprove,
        IconChatAdd,
        IconCart,
        IconCalendar,
        IconBlock,
    },
    asyncData() {
        // Theme Colors
        const themeNames = Object.keys(sassThemeColors)
            .map((k) => k)
            .reduce((prev, cur) => {
                // eslint-disable-next-line no-param-reassign
                prev[cur] = cur;
                return prev;
            }, {});
        const themeColorOptions = Object.keys(themeNames).map((k) => ({
            text: k,
            value: k,
        }));
        const themeColors = Object.keys(themeNames)
            .map((k) => k)
            .reduce((prev, cur) => {
                // eslint-disable-next-line no-param-reassign
                prev[cur] = sassThemeColors[cur];
                return prev;
            }, {});

        // Orientation
        const orientationClockwise = 'clockwise';
        const orientationCounterClockwise = 'counter-clockwise';
        const orientationSelected = orientationClockwise;
        const orientationOptions = [
            { text: 'Clockwise', value: orientationClockwise },
            { text: 'Counter-Clockwise', value: orientationCounterClockwise },
        ];

        // Orientation (Top, Right, Bottom, Left)
        const orientationTop = 'top';
        const orientationRight = 'right';
        const orientationDown = 'down';
        const orientationLeft = 'left';
        const orientationTopRightDownLeftSelected = orientationTop;
        const orientationTopRightDownLeftOptions = [
            { text: 'Top', value: orientationTop },
            { text: 'Right', value: orientationRight },
            { text: 'Down', value: orientationDown },
            { text: 'Left', value: orientationLeft },
        ];

        return {
            themeColorSelected: themeNames.primary,
            themeColorOptions,
            themeColors,
            themeNames,
            orientationSelected,
            orientationOptions,
            orientationTopRightDownLeftSelected,
            orientationTopRightDownLeftOptions,
        };
    },
    computed: {
        themeHexVal() {
            return this.themeColors[this.themeColorSelected];
        },
    },
};
</script>

<style lang="scss" scoped>
.ds-icon-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1rem;
    list-style: none;
}
</style>
