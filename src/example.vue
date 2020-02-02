<template>
    <div class="vue-funnel-graph-lib-dev">
        <div class="funnels">
            <vue-funnel-graph :width="width" :height="height" :labels="labels"
                              :values="values" :colors="colors" :sub-labels="subLabels" :direction="direction"
                              :gradient-direction="gradientDirection"
                              :animated="true" :display-percentage="true"
                              :sub-label-value="subLabelValue"
            ></vue-funnel-graph>
        </div>
        <div class="controls">
            <button @click="getNextSet()">Change Data</button>
            <button @click="toggleDirection()">Toggle Direction</button>
            <button @click="toggleGradient()">Toggle Gradient Direction</button>
        </div>
    </div>
</template>

<script>
import { VueFunnelGraph } from './entry';
export default {
    name:  'VueFunnelGraphDev', // vue library dev component
    components: {
        VueFunnelGraph
    },
    data() {
        return {
            labels: ['Impressions', 'Add To Cart', 'Buy'],
            subLabels: [],
            values: [12000, 5700, 930],
            colors: ['#FFB178', '#FF3C8E'],
            direction: 'horizontal',
            gradientDirection: 'horizontal',
            height: 300,
            width: 800,
            dataSetNum: 1,
            subLabelValue: 'percent'
        };
    },
    methods: {
        useDataSet1() {
            this.labels = ['Impressions', 'Add To Cart', 'Buy'];
            this.subLabels = [];
            this.values = [12000, 4700, 930];
            this.colors = ['#FFB178', '#FF3C8E'];
        },
        useDataSet2() {
            this.labels = ['Impressions', 'Add To Cart', 'Buy'];
            this.subLabels = [];
            this.values = [14000, 9100, 1230];
            this.colors = ['#A0BBFF', '#EC77FF'];
        },
        useDataSet3() {
            this.labels = ['Impressions', 'Add To Cart', 'Buy'];
            this.subLabels = ['Direct', 'Social Media', 'Ads'];
            this.values = [
                [3000, 2500, 6500],
                [3000, 1700, 1000],
                [600, 200, 130]
            ];
            this.colors = [
                ['#FFB178', '#FF78B1', '#FF3C8E'],
                ['#A0BBFF', '#EC77FF'],
                ['#A0F9FF', '#7795FF']
            ];
        },
        useDataSet4() {
            this.labels = ['Impressions', 'Add To Cart', 'Buy', 'Return'];
            this.subLabels = [];
            this.values = [14000, 9100, 4230, 260];
            this.colors = ['#FF4589', '#FF5050'];
        },
        useDataSet5() {
            this.labels = ['Impressions', 'Add To Cart', 'Buy'];
            this.subLabels = [];
            this.values = [12650, 4230, 263];
            this.colors = ['#FF9A9A', '#FFB178'];
        },
        useDataSet6() {
            this.labels = ['Impressions', 'Add To Cart', 'Buy'];
            this.subLabels = ['Direct', 'Social Media', 'Ads', 'Other'];
            this.values = [
                [3000, 2500, 2000, 4500],
                [3000, 1700, 500, 500],
                [600, 200, 100, 30]
            ];
            this.colors = [
                ['#A0BBFF', '#EC77FF'],
                ['#FFB178', '#FF78B1', '#FF3C8E'],
                ['#A0F9FF', '#7795FF']
            ];
        },
        makeVertical() {
            this.direction = 'vertical';
            this.height = 500;
            this.width = 400;
            this.gradientV();
        },
        makeHorizontal() {
            this.direction = 'horizontal';
            this.height = 300;
            this.width = 800;
            this.gradientH();
        },
        toggleDirection() {
            (this.direction === 'horizontal') ? this.makeVertical() : this.makeHorizontal();
        },
        gradientV() {
            this.gradientDirection = 'vertical';
        },
        gradientH() {
            this.gradientDirection = 'horizontal';
        },
        toggleGradient() {
            (this.gradientDirection === 'horizontal') ? this.gradientV() : this.gradientH();
        },
        getNextSet() {
            this.dataSetNum++;
            if (this.dataSetNum > 6) {
                this.dataSetNum = 1;
            }

            this[`useDataSet${this.dataSetNum}`]();
        }
    }
}
</script>

<style>
    body {
        background-color: #393862;
    }

    .vue-funnel-graph-lib-dev {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .funnels {
        height: 580px;
        margin-top: 32px;
    }

    .funnel:not(.svg-funnel-js--vertical) {
        transition: transform 0.3s ease;
        transform: translateY(100px);
    }

    .controls {
        display: flex;
    }

    button {
        background: #21FFA2;
        color: #393862;
        border-radius: 4px;
        border: none;
        padding: 12px 24px;
        margin: 0 5px;
        font-size: 16px;
        outline: 0;
        cursor: pointer;
    }

    button:hover {
        background: #05DF9D;
    }
</style>
