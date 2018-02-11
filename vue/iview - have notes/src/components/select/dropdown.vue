<template>
    <div class="ivu-select-dropdown" 
        :class="className" :style="styles"
        ><slot></slot></div>
</template>
<script>
    import Vue from 'vue';
    // const isServer = Vue.prototype.$isServer;
    import { getStyle } from '../../utils/assist';
    const Popper = require('popper.js');
    // const Popper = isServer ? function() {} : require('popper.js');  // eslint-disable-line

    export default {
        name: 'Drop',
        props: {
            // placement: {
            //     type: String,
            //     default: 'bottom-start'
            // },
            className: {
                type: String
            }
        },
        data () {
            return {
                popper: null,
                width: ''
                // placement: 'bottom-start'
            };
        },
        computed: {
            styles () {
                let style = {};
                if (this.width) style.width = `${this.width}px`;
                return style;
            }
        },
        methods: {
            update () {
                // if (isServer) return;
                if (this.popper) {
                    this.$nextTick(() => {
                        this.popper.update();
                    });
                } else {
                    this.$nextTick(() => {
                        this.popper = new Popper(this.$parent.$refs.reference, this.$el, {
                            gpuAcceleration: false,
                            placement: 'bottom-start',
                            boundariesPadding: 0,
                            forceAbsolute: true,
                            boundariesElement: 'body'
                        });
                        console.log(this.popper.onCreate)
                        
                        this.popper.onCreate(popper => {
                            // this.resetTransformOrigin(popper);
                        });
                    });
                }
                // set a height for parent is Modal and Select's width is 100%
                if (this.$parent.$options.name === 'iSelect') {
                    this.width = parseInt(getStyle(this.$parent.$el, 'width'));
                }
            },
            destroy () {
                if (this.popper) {
                    this.resetTransformOrigin(this.popper);
                    setTimeout(() => {
                        this.popper.destroy();
                        this.popper = null;
                    }, 300);
                }
            },
            resetTransformOrigin(popper) {
                // let placementMap = {top: 'bottom', bottom: 'top'};
                // let placement = popper._popper.getAttribute('x-placement').split('-')[0];
                // let origin = placementMap[placement];
                // popper._popper.style.transformOrigin = 'center bottom';
            }
        },
        created () {
            this.$on('on-update-popper', this.update);
            this.$on('on-destroy-popper', this.destroy);
        },
        beforeDestroy () {
            if (this.popper) {
                this.popper.destroy();
            }
        }
    };
</script>
