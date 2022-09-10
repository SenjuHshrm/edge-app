'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">edge-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AcctRequestModule.html" data-type="entity-link" >AcctRequestModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AcctRequestModule-6129d9db0b984440d92246a59eebfb97cbcbe67b2641ef56e0947726d2c27c566502263e4060989710852b2d06f5ad872abd24911f3c9052288f24c786339e55"' : 'data-target="#xs-components-links-module-AcctRequestModule-6129d9db0b984440d92246a59eebfb97cbcbe67b2641ef56e0947726d2c27c566502263e4060989710852b2d06f5ad872abd24911f3c9052288f24c786339e55"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AcctRequestModule-6129d9db0b984440d92246a59eebfb97cbcbe67b2641ef56e0947726d2c27c566502263e4060989710852b2d06f5ad872abd24911f3c9052288f24c786339e55"' :
                                            'id="xs-components-links-module-AcctRequestModule-6129d9db0b984440d92246a59eebfb97cbcbe67b2641ef56e0947726d2c27c566502263e4060989710852b2d06f5ad872abd24911f3c9052288f24c786339e55"' }>
                                            <li class="link">
                                                <a href="components/AcctRequestComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AcctRequestComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AcctRequestRoutingModule.html" data-type="entity-link" >AcctRequestRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminModule-5e2424c1fb1da0f8fb7e3840ae06a6dcb58635f7dc927685ffb19a512d69ea349ae33f9281f46d29b3d0e8f1a5fa5fbf0e7b8c36adbf8b712d3ac8247ec2f00d"' : 'data-target="#xs-components-links-module-AdminModule-5e2424c1fb1da0f8fb7e3840ae06a6dcb58635f7dc927685ffb19a512d69ea349ae33f9281f46d29b3d0e8f1a5fa5fbf0e7b8c36adbf8b712d3ac8247ec2f00d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-5e2424c1fb1da0f8fb7e3840ae06a6dcb58635f7dc927685ffb19a512d69ea349ae33f9281f46d29b3d0e8f1a5fa5fbf0e7b8c36adbf8b712d3ac8247ec2f00d"' :
                                            'id="xs-components-links-module-AdminModule-5e2424c1fb1da0f8fb7e3840ae06a6dcb58635f7dc927685ffb19a512d69ea349ae33f9281f46d29b3d0e8f1a5fa5fbf0e7b8c36adbf8b712d3ac8247ec2f00d"' }>
                                            <li class="link">
                                                <a href="components/AdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link" >AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-51896a6ec8e1b42886eddb9cd101dd5f79cfed1be0d15b0b1e928f8e00f454e0358e48190a7d55017977fab73868a28c21ade85490fcff71c26a0f105204eecb"' : 'data-target="#xs-components-links-module-AppModule-51896a6ec8e1b42886eddb9cd101dd5f79cfed1be0d15b0b1e928f8e00f454e0358e48190a7d55017977fab73868a28c21ade85490fcff71c26a0f105204eecb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-51896a6ec8e1b42886eddb9cd101dd5f79cfed1be0d15b0b1e928f8e00f454e0358e48190a7d55017977fab73868a28c21ade85490fcff71c26a0f105204eecb"' :
                                            'id="xs-components-links-module-AppModule-51896a6ec8e1b42886eddb9cd101dd5f79cfed1be0d15b0b1e928f8e00f454e0358e48190a7d55017977fab73868a28c21ade85490fcff71c26a0f105204eecb"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BookingListModule.html" data-type="entity-link" >BookingListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BookingListModule-b6ec48e49e90b7cff09ac8a34db7b3c29e134ed0361bc57e9dc6ff71106ef88e6f79d3477c97c9b993084a856181da99ab1f9cefa5bd539cefe4cde4fe2dda2b"' : 'data-target="#xs-components-links-module-BookingListModule-b6ec48e49e90b7cff09ac8a34db7b3c29e134ed0361bc57e9dc6ff71106ef88e6f79d3477c97c9b993084a856181da99ab1f9cefa5bd539cefe4cde4fe2dda2b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BookingListModule-b6ec48e49e90b7cff09ac8a34db7b3c29e134ed0361bc57e9dc6ff71106ef88e6f79d3477c97c9b993084a856181da99ab1f9cefa5bd539cefe4cde4fe2dda2b"' :
                                            'id="xs-components-links-module-BookingListModule-b6ec48e49e90b7cff09ac8a34db7b3c29e134ed0361bc57e9dc6ff71106ef88e6f79d3477c97c9b993084a856181da99ab1f9cefa5bd539cefe4cde4fe2dda2b"' }>
                                            <li class="link">
                                                <a href="components/BookingListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookingListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BookingListRoutingModule.html" data-type="entity-link" >BookingListRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BookingModule.html" data-type="entity-link" >BookingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BookingModule-06af6f347e32592e1964239c4ca87989e020ca2d25b877f9ba5965aa36e0c17fe69b70de882d56ad05fc457a1d826804ea11838bdc1fe210b4d32475e4b45745"' : 'data-target="#xs-components-links-module-BookingModule-06af6f347e32592e1964239c4ca87989e020ca2d25b877f9ba5965aa36e0c17fe69b70de882d56ad05fc457a1d826804ea11838bdc1fe210b4d32475e4b45745"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BookingModule-06af6f347e32592e1964239c4ca87989e020ca2d25b877f9ba5965aa36e0c17fe69b70de882d56ad05fc457a1d826804ea11838bdc1fe210b4d32475e4b45745"' :
                                            'id="xs-components-links-module-BookingModule-06af6f347e32592e1964239c4ca87989e020ca2d25b877f9ba5965aa36e0c17fe69b70de882d56ad05fc457a1d826804ea11838bdc1fe210b4d32475e4b45745"' }>
                                            <li class="link">
                                                <a href="components/BookingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookingComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BookingRoutingModule.html" data-type="entity-link" >BookingRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoaNdaModule.html" data-type="entity-link" >CoaNdaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CoaNdaModule-1ae8e51f50722b57387fcbeec325ebc9dca56571c05ce5f84a1ffa1a1b4a126cc383d4b2aa6b118dbefc9c10ad5bf3278b18264f82b8cd8462a9b1eb3d072e71"' : 'data-target="#xs-components-links-module-CoaNdaModule-1ae8e51f50722b57387fcbeec325ebc9dca56571c05ce5f84a1ffa1a1b4a126cc383d4b2aa6b118dbefc9c10ad5bf3278b18264f82b8cd8462a9b1eb3d072e71"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoaNdaModule-1ae8e51f50722b57387fcbeec325ebc9dca56571c05ce5f84a1ffa1a1b4a126cc383d4b2aa6b118dbefc9c10ad5bf3278b18264f82b8cd8462a9b1eb3d072e71"' :
                                            'id="xs-components-links-module-CoaNdaModule-1ae8e51f50722b57387fcbeec325ebc9dca56571c05ce5f84a1ffa1a1b4a126cc383d4b2aa6b118dbefc9c10ad5bf3278b18264f82b8cd8462a9b1eb3d072e71"' }>
                                            <li class="link">
                                                <a href="components/CoaNdaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoaNdaComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoaNdaModule.html" data-type="entity-link" >CoaNdaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CoaNdaModule-40af49bc18d143ba615084f59e7d1163238c68061ca3f3b65520df35000179f2557220baed6549fd4bd2ea6991690eca293f880154da2766b7fdce6e7555bdc4-1"' : 'data-target="#xs-components-links-module-CoaNdaModule-40af49bc18d143ba615084f59e7d1163238c68061ca3f3b65520df35000179f2557220baed6549fd4bd2ea6991690eca293f880154da2766b7fdce6e7555bdc4-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoaNdaModule-40af49bc18d143ba615084f59e7d1163238c68061ca3f3b65520df35000179f2557220baed6549fd4bd2ea6991690eca293f880154da2766b7fdce6e7555bdc4-1"' :
                                            'id="xs-components-links-module-CoaNdaModule-40af49bc18d143ba615084f59e7d1163238c68061ca3f3b65520df35000179f2557220baed6549fd4bd2ea6991690eca293f880154da2766b7fdce6e7555bdc4-1"' }>
                                            <li class="link">
                                                <a href="components/CoaNdaComponent-1.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoaNdaComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoaNdaRoutingModule.html" data-type="entity-link" >CoaNdaRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoaNdaRoutingModule.html" data-type="entity-link" >CoaNdaRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentsModule.html" data-type="entity-link" >ComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComponentsModule-11e6daff0d1fe244692ab3ba7855250f29e9538d240caf7f9327f69947d721ab669ea5b8a2351debb829520e73c5ac226b4ab99f1fdb1e25654fe9f0f25a5e59"' : 'data-target="#xs-components-links-module-ComponentsModule-11e6daff0d1fe244692ab3ba7855250f29e9538d240caf7f9327f69947d721ab669ea5b8a2351debb829520e73c5ac226b4ab99f1fdb1e25654fe9f0f25a5e59"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentsModule-11e6daff0d1fe244692ab3ba7855250f29e9538d240caf7f9327f69947d721ab669ea5b8a2351debb829520e73c5ac226b4ab99f1fdb1e25654fe9f0f25a5e59"' :
                                            'id="xs-components-links-module-ComponentsModule-11e6daff0d1fe244692ab3ba7855250f29e9538d240caf7f9327f69947d721ab669ea5b8a2351debb829520e73c5ac226b4ab99f1fdb1e25654fe9f0f25a5e59"' }>
                                            <li class="link">
                                                <a href="components/AssignCodeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AssignCodeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BarChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BarChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClassificationUpdateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClassificationUpdateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateBookingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateBookingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateBundleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateBundleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateCustomerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateCustomerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateInquiryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateInquiryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreatePurchaseOrderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreatePurchaseOrderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateQuotationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateQuotationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExportComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LineChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LineChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoadingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectKeypartnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectKeypartnerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SetKeypartnerPasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SetKeypartnerPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpdateBundleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateBundleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpdateCustomerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateCustomerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpdateItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpdateKeypartnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateKeypartnerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewBundleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewBundleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewByIdComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewByIdComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewInquiryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewInquiryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewPurchaseOrderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewPurchaseOrderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewQuotationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewQuotationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CreatePurchaseOrderModule.html" data-type="entity-link" >CreatePurchaseOrderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CreatePurchaseOrderModule-cd247aba6e2200bbd791b8509c2d4f3821fd8da7427260d191b2ae28e593564d5015dc8096f7dfd4be3694b238b480ea99056f4999c1033a3348713597dd5f6f"' : 'data-target="#xs-components-links-module-CreatePurchaseOrderModule-cd247aba6e2200bbd791b8509c2d4f3821fd8da7427260d191b2ae28e593564d5015dc8096f7dfd4be3694b238b480ea99056f4999c1033a3348713597dd5f6f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CreatePurchaseOrderModule-cd247aba6e2200bbd791b8509c2d4f3821fd8da7427260d191b2ae28e593564d5015dc8096f7dfd4be3694b238b480ea99056f4999c1033a3348713597dd5f6f"' :
                                            'id="xs-components-links-module-CreatePurchaseOrderModule-cd247aba6e2200bbd791b8509c2d4f3821fd8da7427260d191b2ae28e593564d5015dc8096f7dfd4be3694b238b480ea99056f4999c1033a3348713597dd5f6f"' }>
                                            <li class="link">
                                                <a href="components/CreatePurchaseOrderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreatePurchaseOrderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CreatePurchaseOrderRoutingModule.html" data-type="entity-link" >CreatePurchaseOrderRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link" >DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardModule-f6cd9a36f378f951075309df4b7f565e9df6037ac70274ac1852bccc6ba632523b741562d123a52c07185ba9dcebcc97f8f2c46d649e5652d64955e7c5213689"' : 'data-target="#xs-components-links-module-DashboardModule-f6cd9a36f378f951075309df4b7f565e9df6037ac70274ac1852bccc6ba632523b741562d123a52c07185ba9dcebcc97f8f2c46d649e5652d64955e7c5213689"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-f6cd9a36f378f951075309df4b7f565e9df6037ac70274ac1852bccc6ba632523b741562d123a52c07185ba9dcebcc97f8f2c46d649e5652d64955e7c5213689"' :
                                            'id="xs-components-links-module-DashboardModule-f6cd9a36f378f951075309df4b7f565e9df6037ac70274ac1852bccc6ba632523b741562d123a52c07185ba9dcebcc97f8f2c46d649e5652d64955e7c5213689"' }>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link" >DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardModule-6d40ab783c7d1819f459d8728ef2b528d5dbdb0e247f24e18eb7267cb2198cbcf0bfd4232ad4b90f250d5d6769cb1d4d5d1da770ceb9a42d3b31dd0a51354c33-1"' : 'data-target="#xs-components-links-module-DashboardModule-6d40ab783c7d1819f459d8728ef2b528d5dbdb0e247f24e18eb7267cb2198cbcf0bfd4232ad4b90f250d5d6769cb1d4d5d1da770ceb9a42d3b31dd0a51354c33-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-6d40ab783c7d1819f459d8728ef2b528d5dbdb0e247f24e18eb7267cb2198cbcf0bfd4232ad4b90f250d5d6769cb1d4d5d1da770ceb9a42d3b31dd0a51354c33-1"' :
                                            'id="xs-components-links-module-DashboardModule-6d40ab783c7d1819f459d8728ef2b528d5dbdb0e247f24e18eb7267cb2198cbcf0bfd4232ad4b90f250d5d6769cb1d4d5d1da770ceb9a42d3b31dd0a51354c33-1"' }>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link" >DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardModule-dd5a4fc72296ae14d7f0f76a41519b1bd3336c772795b1b7d9da93183ae1e072accb969557814c9ff4126b765b6a1300036995732ad8d99adae980bc750b9814-2"' : 'data-target="#xs-components-links-module-DashboardModule-dd5a4fc72296ae14d7f0f76a41519b1bd3336c772795b1b7d9da93183ae1e072accb969557814c9ff4126b765b6a1300036995732ad8d99adae980bc750b9814-2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-dd5a4fc72296ae14d7f0f76a41519b1bd3336c772795b1b7d9da93183ae1e072accb969557814c9ff4126b765b6a1300036995732ad8d99adae980bc750b9814-2"' :
                                            'id="xs-components-links-module-DashboardModule-dd5a4fc72296ae14d7f0f76a41519b1bd3336c772795b1b7d9da93183ae1e072accb969557814c9ff4126b765b6a1300036995732ad8d99adae980bc750b9814-2"' }>
                                            <li class="link">
                                                <a href="components/DashboardComponent-2.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardRoutingModule.html" data-type="entity-link" >DashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardRoutingModule.html" data-type="entity-link" >DashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardRoutingModule.html" data-type="entity-link" >DashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ErrorModule.html" data-type="entity-link" >ErrorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ErrorModule-09b2d54dd2f1b2d73e23c8c6c6ce977c5a8e045febb1a37e55c8bc3abc49a4f2d2e0b5f241aa8cd35fe5d3520feb29235d23c2e13b0d4c3bc950c1c320068937"' : 'data-target="#xs-components-links-module-ErrorModule-09b2d54dd2f1b2d73e23c8c6c6ce977c5a8e045febb1a37e55c8bc3abc49a4f2d2e0b5f241aa8cd35fe5d3520feb29235d23c2e13b0d4c3bc950c1c320068937"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ErrorModule-09b2d54dd2f1b2d73e23c8c6c6ce977c5a8e045febb1a37e55c8bc3abc49a4f2d2e0b5f241aa8cd35fe5d3520feb29235d23c2e13b0d4c3bc950c1c320068937"' :
                                            'id="xs-components-links-module-ErrorModule-09b2d54dd2f1b2d73e23c8c6c6ce977c5a8e045febb1a37e55c8bc3abc49a4f2d2e0b5f241aa8cd35fe5d3520feb29235d23c2e13b0d4c3bc950c1c320068937"' }>
                                            <li class="link">
                                                <a href="components/ErrorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ErrorRoutingModule.html" data-type="entity-link" >ErrorRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ForbiddenModule.html" data-type="entity-link" >ForbiddenModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ForbiddenModule-c6f4e2a69113c0d912dc8c1727c972cfc67ee28d2e6bdad0abb7ac24f070a564284ae81b3cd362f05b8ac8580ff7008704eb316fdbaaa9ac14e38bf9f30a3736"' : 'data-target="#xs-components-links-module-ForbiddenModule-c6f4e2a69113c0d912dc8c1727c972cfc67ee28d2e6bdad0abb7ac24f070a564284ae81b3cd362f05b8ac8580ff7008704eb316fdbaaa9ac14e38bf9f30a3736"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ForbiddenModule-c6f4e2a69113c0d912dc8c1727c972cfc67ee28d2e6bdad0abb7ac24f070a564284ae81b3cd362f05b8ac8580ff7008704eb316fdbaaa9ac14e38bf9f30a3736"' :
                                            'id="xs-components-links-module-ForbiddenModule-c6f4e2a69113c0d912dc8c1727c972cfc67ee28d2e6bdad0abb7ac24f070a564284ae81b3cd362f05b8ac8580ff7008704eb316fdbaaa9ac14e38bf9f30a3736"' }>
                                            <li class="link">
                                                <a href="components/ForbiddenComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForbiddenComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ForbiddenRoutingModule.html" data-type="entity-link" >ForbiddenRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ForgotPasswordModule.html" data-type="entity-link" >ForgotPasswordModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ForgotPasswordModule-43aff3838361b5c3928be7a25665353591caac7f82251f4ddf27056136c208b5ce5c3a7e2d9c518876632c20cc24bf1514f72ed62fb571e4bb69c8ef48095720"' : 'data-target="#xs-components-links-module-ForgotPasswordModule-43aff3838361b5c3928be7a25665353591caac7f82251f4ddf27056136c208b5ce5c3a7e2d9c518876632c20cc24bf1514f72ed62fb571e4bb69c8ef48095720"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ForgotPasswordModule-43aff3838361b5c3928be7a25665353591caac7f82251f4ddf27056136c208b5ce5c3a7e2d9c518876632c20cc24bf1514f72ed62fb571e4bb69c8ef48095720"' :
                                            'id="xs-components-links-module-ForgotPasswordModule-43aff3838361b5c3928be7a25665353591caac7f82251f4ddf27056136c208b5ce5c3a7e2d9c518876632c20cc24bf1514f72ed62fb571e4bb69c8ef48095720"' }>
                                            <li class="link">
                                                <a href="components/ForgotPasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForgotPasswordComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ForgotPasswordRoutingModule.html" data-type="entity-link" >ForgotPasswordRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-4edf7a7919d1a695555888f28fa4f09a53be05d5784864b32f3da9ae0c03f9b242763ba28e1dab2624cbdacbc5635df650c2d821e968865d1ed40b82d07cabc5"' : 'data-target="#xs-components-links-module-HomeModule-4edf7a7919d1a695555888f28fa4f09a53be05d5784864b32f3da9ae0c03f9b242763ba28e1dab2624cbdacbc5635df650c2d821e968865d1ed40b82d07cabc5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-4edf7a7919d1a695555888f28fa4f09a53be05d5784864b32f3da9ae0c03f9b242763ba28e1dab2624cbdacbc5635df650c2d821e968865d1ed40b82d07cabc5"' :
                                            'id="xs-components-links-module-HomeModule-4edf7a7919d1a695555888f28fa4f09a53be05d5784864b32f3da9ae0c03f9b242763ba28e1dab2624cbdacbc5635df650c2d821e968865d1ed40b82d07cabc5"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-4edf7a7919d1a695555888f28fa4f09a53be05d5784864b32f3da9ae0c03f9b242763ba28e1dab2624cbdacbc5635df650c2d821e968865d1ed40b82d07cabc5-1"' : 'data-target="#xs-components-links-module-HomeModule-4edf7a7919d1a695555888f28fa4f09a53be05d5784864b32f3da9ae0c03f9b242763ba28e1dab2624cbdacbc5635df650c2d821e968865d1ed40b82d07cabc5-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-4edf7a7919d1a695555888f28fa4f09a53be05d5784864b32f3da9ae0c03f9b242763ba28e1dab2624cbdacbc5635df650c2d821e968865d1ed40b82d07cabc5-1"' :
                                            'id="xs-components-links-module-HomeModule-4edf7a7919d1a695555888f28fa4f09a53be05d5784864b32f3da9ae0c03f9b242763ba28e1dab2624cbdacbc5635df650c2d821e968865d1ed40b82d07cabc5-1"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent-1.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-6ef258fed54887bbe5e7f3a480be9fa26657015e05da5f5ecb27e6fda3b46e21565168877336e8aa2850fa4f5368d1225827b5aab22bd6b7dfb0dcf6e2f53af4-2"' : 'data-target="#xs-components-links-module-HomeModule-6ef258fed54887bbe5e7f3a480be9fa26657015e05da5f5ecb27e6fda3b46e21565168877336e8aa2850fa4f5368d1225827b5aab22bd6b7dfb0dcf6e2f53af4-2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-6ef258fed54887bbe5e7f3a480be9fa26657015e05da5f5ecb27e6fda3b46e21565168877336e8aa2850fa4f5368d1225827b5aab22bd6b7dfb0dcf6e2f53af4-2"' :
                                            'id="xs-components-links-module-HomeModule-6ef258fed54887bbe5e7f3a480be9fa26657015e05da5f5ecb27e6fda3b46e21565168877336e8aa2850fa4f5368d1225827b5aab22bd6b7dfb0dcf6e2f53af4-2"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent-2.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-4edf7a7919d1a695555888f28fa4f09a53be05d5784864b32f3da9ae0c03f9b242763ba28e1dab2624cbdacbc5635df650c2d821e968865d1ed40b82d07cabc5-3"' : 'data-target="#xs-components-links-module-HomeModule-4edf7a7919d1a695555888f28fa4f09a53be05d5784864b32f3da9ae0c03f9b242763ba28e1dab2624cbdacbc5635df650c2d821e968865d1ed40b82d07cabc5-3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-4edf7a7919d1a695555888f28fa4f09a53be05d5784864b32f3da9ae0c03f9b242763ba28e1dab2624cbdacbc5635df650c2d821e968865d1ed40b82d07cabc5-3"' :
                                            'id="xs-components-links-module-HomeModule-4edf7a7919d1a695555888f28fa4f09a53be05d5784864b32f3da9ae0c03f9b242763ba28e1dab2624cbdacbc5635df650c2d821e968865d1ed40b82d07cabc5-3"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent-3.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link" >HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link" >HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link" >HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link" >HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/InquiryListModule.html" data-type="entity-link" >InquiryListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InquiryListModule-2f25e007adf2d5d08f0eb77cb7229b3e26f59c4d2039f837313f3bf8e6b97a06848d861630433a1fc47c4ea361187cebe2b35a5b7b1b7f2382461c8e9cab409a"' : 'data-target="#xs-components-links-module-InquiryListModule-2f25e007adf2d5d08f0eb77cb7229b3e26f59c4d2039f837313f3bf8e6b97a06848d861630433a1fc47c4ea361187cebe2b35a5b7b1b7f2382461c8e9cab409a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InquiryListModule-2f25e007adf2d5d08f0eb77cb7229b3e26f59c4d2039f837313f3bf8e6b97a06848d861630433a1fc47c4ea361187cebe2b35a5b7b1b7f2382461c8e9cab409a"' :
                                            'id="xs-components-links-module-InquiryListModule-2f25e007adf2d5d08f0eb77cb7229b3e26f59c4d2039f837313f3bf8e6b97a06848d861630433a1fc47c4ea361187cebe2b35a5b7b1b7f2382461c8e9cab409a"' }>
                                            <li class="link">
                                                <a href="components/InquiryListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InquiryListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InquiryListRoutingModule.html" data-type="entity-link" >InquiryListRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/InquiryModule.html" data-type="entity-link" >InquiryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InquiryModule-bc8e23088af5f27fb43398a90361f33f695c04e98fce13b767ccefd6f2deca7f9b2cf7759855a6053382aa4d8b71cd83172fad21ea5782d6be62fb81690fd2e2"' : 'data-target="#xs-components-links-module-InquiryModule-bc8e23088af5f27fb43398a90361f33f695c04e98fce13b767ccefd6f2deca7f9b2cf7759855a6053382aa4d8b71cd83172fad21ea5782d6be62fb81690fd2e2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InquiryModule-bc8e23088af5f27fb43398a90361f33f695c04e98fce13b767ccefd6f2deca7f9b2cf7759855a6053382aa4d8b71cd83172fad21ea5782d6be62fb81690fd2e2"' :
                                            'id="xs-components-links-module-InquiryModule-bc8e23088af5f27fb43398a90361f33f695c04e98fce13b767ccefd6f2deca7f9b2cf7759855a6053382aa4d8b71cd83172fad21ea5782d6be62fb81690fd2e2"' }>
                                            <li class="link">
                                                <a href="components/InquiryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InquiryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InquiryRoutingModule.html" data-type="entity-link" >InquiryRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/InventoryModule.html" data-type="entity-link" >InventoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InventoryModule-812dc936e7a5a544e5626754ca30d7b7d5d414dbcfbfa3966485996ac995697df26db2afe45fd545710b4ccbc6630469a2358545bc12a581fa438eff15b2a529"' : 'data-target="#xs-components-links-module-InventoryModule-812dc936e7a5a544e5626754ca30d7b7d5d414dbcfbfa3966485996ac995697df26db2afe45fd545710b4ccbc6630469a2358545bc12a581fa438eff15b2a529"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InventoryModule-812dc936e7a5a544e5626754ca30d7b7d5d414dbcfbfa3966485996ac995697df26db2afe45fd545710b4ccbc6630469a2358545bc12a581fa438eff15b2a529"' :
                                            'id="xs-components-links-module-InventoryModule-812dc936e7a5a544e5626754ca30d7b7d5d414dbcfbfa3966485996ac995697df26db2afe45fd545710b4ccbc6630469a2358545bc12a581fa438eff15b2a529"' }>
                                            <li class="link">
                                                <a href="components/InventoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InventoryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InventoryRoutingModule.html" data-type="entity-link" >InventoryRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/KeyPartnersModule.html" data-type="entity-link" >KeyPartnersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-KeyPartnersModule-1b8b25d97ebcdc3dd709adbb11f72f4706ea978b2b40ce8e5af18c6643decf4d186503ef846496a269531e5b0d6ddb08c6ed1a588a7b1f96b971f5be807798f1"' : 'data-target="#xs-components-links-module-KeyPartnersModule-1b8b25d97ebcdc3dd709adbb11f72f4706ea978b2b40ce8e5af18c6643decf4d186503ef846496a269531e5b0d6ddb08c6ed1a588a7b1f96b971f5be807798f1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-KeyPartnersModule-1b8b25d97ebcdc3dd709adbb11f72f4706ea978b2b40ce8e5af18c6643decf4d186503ef846496a269531e5b0d6ddb08c6ed1a588a7b1f96b971f5be807798f1"' :
                                            'id="xs-components-links-module-KeyPartnersModule-1b8b25d97ebcdc3dd709adbb11f72f4706ea978b2b40ce8e5af18c6643decf4d186503ef846496a269531e5b0d6ddb08c6ed1a588a7b1f96b971f5be807798f1"' }>
                                            <li class="link">
                                                <a href="components/KeyPartnersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KeyPartnersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/KeyPartnersModule.html" data-type="entity-link" >KeyPartnersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-KeyPartnersModule-48de0c1b42520674b882cc1b01b240b3c467820ad4d5a341a114dc1f16ea461dcb4aa1e09a951f3adc7042f7b303cbed89a7308365e225718764d4972383c5cb-1"' : 'data-target="#xs-components-links-module-KeyPartnersModule-48de0c1b42520674b882cc1b01b240b3c467820ad4d5a341a114dc1f16ea461dcb4aa1e09a951f3adc7042f7b303cbed89a7308365e225718764d4972383c5cb-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-KeyPartnersModule-48de0c1b42520674b882cc1b01b240b3c467820ad4d5a341a114dc1f16ea461dcb4aa1e09a951f3adc7042f7b303cbed89a7308365e225718764d4972383c5cb-1"' :
                                            'id="xs-components-links-module-KeyPartnersModule-48de0c1b42520674b882cc1b01b240b3c467820ad4d5a341a114dc1f16ea461dcb4aa1e09a951f3adc7042f7b303cbed89a7308365e225718764d4972383c5cb-1"' }>
                                            <li class="link">
                                                <a href="components/KeyPartnersComponent-1.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KeyPartnersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/KeyPartnersRoutingModule.html" data-type="entity-link" >KeyPartnersRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/KeyPartnersRoutingModule.html" data-type="entity-link" >KeyPartnersRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link" >LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginModule-b0f6a15610e7db9b2d9fe6061803e3c55ea413126e333d347ee4ccfdfd3ab92e812997c8283877739457e5abb28e6e9fa6a8e3698e2ba8a29c0767b18d301769"' : 'data-target="#xs-components-links-module-LoginModule-b0f6a15610e7db9b2d9fe6061803e3c55ea413126e333d347ee4ccfdfd3ab92e812997c8283877739457e5abb28e6e9fa6a8e3698e2ba8a29c0767b18d301769"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-b0f6a15610e7db9b2d9fe6061803e3c55ea413126e333d347ee4ccfdfd3ab92e812997c8283877739457e5abb28e6e9fa6a8e3698e2ba8a29c0767b18d301769"' :
                                            'id="xs-components-links-module-LoginModule-b0f6a15610e7db9b2d9fe6061803e3c55ea413126e333d347ee4ccfdfd3ab92e812997c8283877739457e5abb28e6e9fa6a8e3698e2ba8a29c0767b18d301769"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link" >LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginModule-ab88e0384fc63d43448ec8ad4f2f632a2f6c8357db3670d66b2874d0a8b73dbf372a1fcfdf9b38e0cc9c2805fe9f5a73fe9e4e98a83f27acc744a1d254dd9b56-1"' : 'data-target="#xs-components-links-module-LoginModule-ab88e0384fc63d43448ec8ad4f2f632a2f6c8357db3670d66b2874d0a8b73dbf372a1fcfdf9b38e0cc9c2805fe9f5a73fe9e4e98a83f27acc744a1d254dd9b56-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-ab88e0384fc63d43448ec8ad4f2f632a2f6c8357db3670d66b2874d0a8b73dbf372a1fcfdf9b38e0cc9c2805fe9f5a73fe9e4e98a83f27acc744a1d254dd9b56-1"' :
                                            'id="xs-components-links-module-LoginModule-ab88e0384fc63d43448ec8ad4f2f632a2f6c8357db3670d66b2874d0a8b73dbf372a1fcfdf9b38e0cc9c2805fe9f5a73fe9e4e98a83f27acc744a1d254dd9b56-1"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent-1.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link" >LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginModule-e8a128e994ca6ee5132be467e0be48e80564b6c2fafafeabc3517514266b0dbf4b1a1f882e06e1a37563a7d27430ccbde16bc627be822c84309fcb9b787d11c2-2"' : 'data-target="#xs-components-links-module-LoginModule-e8a128e994ca6ee5132be467e0be48e80564b6c2fafafeabc3517514266b0dbf4b1a1f882e06e1a37563a7d27430ccbde16bc627be822c84309fcb9b787d11c2-2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-e8a128e994ca6ee5132be467e0be48e80564b6c2fafafeabc3517514266b0dbf4b1a1f882e06e1a37563a7d27430ccbde16bc627be822c84309fcb9b787d11c2-2"' :
                                            'id="xs-components-links-module-LoginModule-e8a128e994ca6ee5132be467e0be48e80564b6c2fafafeabc3517514266b0dbf4b1a1f882e06e1a37563a7d27430ccbde16bc627be822c84309fcb9b787d11c2-2"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent-2.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginRoutingModule.html" data-type="entity-link" >LoginRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginRoutingModule.html" data-type="entity-link" >LoginRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginRoutingModule.html" data-type="entity-link" >LoginRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LogsModule.html" data-type="entity-link" >LogsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LogsModule-2649e9e15d9b1e936162a915a59358ee6e59ba6886b08a883e099800238199756488c01ff60fa73b296beff9d3786ff0f47553213928db8dcab6893e89ef666f"' : 'data-target="#xs-components-links-module-LogsModule-2649e9e15d9b1e936162a915a59358ee6e59ba6886b08a883e099800238199756488c01ff60fa73b296beff9d3786ff0f47553213928db8dcab6893e89ef666f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LogsModule-2649e9e15d9b1e936162a915a59358ee6e59ba6886b08a883e099800238199756488c01ff60fa73b296beff9d3786ff0f47553213928db8dcab6893e89ef666f"' :
                                            'id="xs-components-links-module-LogsModule-2649e9e15d9b1e936162a915a59358ee6e59ba6886b08a883e099800238199756488c01ff60fa73b296beff9d3786ff0f47553213928db8dcab6893e89ef666f"' }>
                                            <li class="link">
                                                <a href="components/LogsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LogsRoutingModule.html" data-type="entity-link" >LogsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MyCustomerModule.html" data-type="entity-link" >MyCustomerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MyCustomerModule-845717552617486a42964346d486b0d64de0c7e4d300e375120d2dfc141e8f50bb334e01d2c3a95ecd7019a6a26d6264e60db08fb1793a40c7551599cf940fc4"' : 'data-target="#xs-components-links-module-MyCustomerModule-845717552617486a42964346d486b0d64de0c7e4d300e375120d2dfc141e8f50bb334e01d2c3a95ecd7019a6a26d6264e60db08fb1793a40c7551599cf940fc4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MyCustomerModule-845717552617486a42964346d486b0d64de0c7e4d300e375120d2dfc141e8f50bb334e01d2c3a95ecd7019a6a26d6264e60db08fb1793a40c7551599cf940fc4"' :
                                            'id="xs-components-links-module-MyCustomerModule-845717552617486a42964346d486b0d64de0c7e4d300e375120d2dfc141e8f50bb334e01d2c3a95ecd7019a6a26d6264e60db08fb1793a40c7551599cf940fc4"' }>
                                            <li class="link">
                                                <a href="components/MyCustomerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MyCustomerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MyCustomerRoutingModule.html" data-type="entity-link" >MyCustomerRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MyInventoryModule.html" data-type="entity-link" >MyInventoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MyInventoryModule-ca6823a3f44c6f8bb4acd7ddd7858a32bb6b592f427074c8dd5aceeec2fcedf455e1e12384b23327cbe9aa80216301df636083f42541cfdcf74469b807a0f61d"' : 'data-target="#xs-components-links-module-MyInventoryModule-ca6823a3f44c6f8bb4acd7ddd7858a32bb6b592f427074c8dd5aceeec2fcedf455e1e12384b23327cbe9aa80216301df636083f42541cfdcf74469b807a0f61d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MyInventoryModule-ca6823a3f44c6f8bb4acd7ddd7858a32bb6b592f427074c8dd5aceeec2fcedf455e1e12384b23327cbe9aa80216301df636083f42541cfdcf74469b807a0f61d"' :
                                            'id="xs-components-links-module-MyInventoryModule-ca6823a3f44c6f8bb4acd7ddd7858a32bb6b592f427074c8dd5aceeec2fcedf455e1e12384b23327cbe9aa80216301df636083f42541cfdcf74469b807a0f61d"' }>
                                            <li class="link">
                                                <a href="components/MyInventoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MyInventoryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MyInventoryRoutingModule.html" data-type="entity-link" >MyInventoryRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MyQuotationModule.html" data-type="entity-link" >MyQuotationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MyQuotationModule-668372b7b5c18751f9fa554bc6e0c6ea29292c71f77fb6d4bdbf870b0bed229a700db8416da36e5f658887c15aa5dc9a9712522bc51787f4316fa2182694b4eb"' : 'data-target="#xs-components-links-module-MyQuotationModule-668372b7b5c18751f9fa554bc6e0c6ea29292c71f77fb6d4bdbf870b0bed229a700db8416da36e5f658887c15aa5dc9a9712522bc51787f4316fa2182694b4eb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MyQuotationModule-668372b7b5c18751f9fa554bc6e0c6ea29292c71f77fb6d4bdbf870b0bed229a700db8416da36e5f658887c15aa5dc9a9712522bc51787f4316fa2182694b4eb"' :
                                            'id="xs-components-links-module-MyQuotationModule-668372b7b5c18751f9fa554bc6e0c6ea29292c71f77fb6d4bdbf870b0bed229a700db8416da36e5f658887c15aa5dc9a9712522bc51787f4316fa2182694b4eb"' }>
                                            <li class="link">
                                                <a href="components/MyQuotationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MyQuotationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MyQuotationRoutingModule.html" data-type="entity-link" >MyQuotationRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MySoaModule.html" data-type="entity-link" >MySoaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MySoaModule-526b97ce0af41db00bd2099a6b2c4d51b1ad34f304f9f9525013ee35cc0a9a159609a67caff2f532604781dc2832c8f3e38e4a53aa0e0a8b98a0fbabf22cfe23"' : 'data-target="#xs-components-links-module-MySoaModule-526b97ce0af41db00bd2099a6b2c4d51b1ad34f304f9f9525013ee35cc0a9a159609a67caff2f532604781dc2832c8f3e38e4a53aa0e0a8b98a0fbabf22cfe23"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MySoaModule-526b97ce0af41db00bd2099a6b2c4d51b1ad34f304f9f9525013ee35cc0a9a159609a67caff2f532604781dc2832c8f3e38e4a53aa0e0a8b98a0fbabf22cfe23"' :
                                            'id="xs-components-links-module-MySoaModule-526b97ce0af41db00bd2099a6b2c4d51b1ad34f304f9f9525013ee35cc0a9a159609a67caff2f532604781dc2832c8f3e38e4a53aa0e0a8b98a0fbabf22cfe23"' }>
                                            <li class="link">
                                                <a href="components/MySoaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MySoaComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MySoaRoutingModule.html" data-type="entity-link" >MySoaRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NotFoundModule.html" data-type="entity-link" >NotFoundModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NotFoundModule-da51e9fbca80fd7a530bab8bb6df473d5c08f1aeccb3412716439aa428f5d81d5db68c32e286d2fad9da3a9432bc7f69fdd2ca6cd553fc002ef37c16908322ba"' : 'data-target="#xs-components-links-module-NotFoundModule-da51e9fbca80fd7a530bab8bb6df473d5c08f1aeccb3412716439aa428f5d81d5db68c32e286d2fad9da3a9432bc7f69fdd2ca6cd553fc002ef37c16908322ba"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NotFoundModule-da51e9fbca80fd7a530bab8bb6df473d5c08f1aeccb3412716439aa428f5d81d5db68c32e286d2fad9da3a9432bc7f69fdd2ca6cd553fc002ef37c16908322ba"' :
                                            'id="xs-components-links-module-NotFoundModule-da51e9fbca80fd7a530bab8bb6df473d5c08f1aeccb3412716439aa428f5d81d5db68c32e286d2fad9da3a9432bc7f69fdd2ca6cd553fc002ef37c16908322ba"' }>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotFoundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotFoundRoutingModule.html" data-type="entity-link" >NotFoundRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PipesModule.html" data-type="entity-link" >PipesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-PipesModule-b6292c88956cfb8de373e61eb12f83070ba1a8ac059c9b40e3b2283cfc0b303d98e745ed4822ac7a88e65715bb10201b9a2ab6861f1f6e9fd94c59fb7097b0d6"' : 'data-target="#xs-pipes-links-module-PipesModule-b6292c88956cfb8de373e61eb12f83070ba1a8ac059c9b40e3b2283cfc0b303d98e745ed4822ac7a88e65715bb10201b9a2ab6861f1f6e9fd94c59fb7097b0d6"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-PipesModule-b6292c88956cfb8de373e61eb12f83070ba1a8ac059c9b40e3b2283cfc0b303d98e745ed4822ac7a88e65715bb10201b9a2ab6861f1f6e9fd94c59fb7097b0d6"' :
                                            'id="xs-pipes-links-module-PipesModule-b6292c88956cfb8de373e61eb12f83070ba1a8ac059c9b40e3b2283cfc0b303d98e745ed4822ac7a88e65715bb10201b9a2ab6861f1f6e9fd94c59fb7097b0d6"' }>
                                            <li class="link">
                                                <a href="pipes/CustomDatePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomDatePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link" >ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProfileModule-c09f35f573125fd9cb3499d2b972b161ca492e0804dc6f5f1e61cb28e73921136424af5be0e2f0f174b119ae13755f924ac9c3ca77dc50401e7d76f241de0df6"' : 'data-target="#xs-components-links-module-ProfileModule-c09f35f573125fd9cb3499d2b972b161ca492e0804dc6f5f1e61cb28e73921136424af5be0e2f0f174b119ae13755f924ac9c3ca77dc50401e7d76f241de0df6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfileModule-c09f35f573125fd9cb3499d2b972b161ca492e0804dc6f5f1e61cb28e73921136424af5be0e2f0f174b119ae13755f924ac9c3ca77dc50401e7d76f241de0df6"' :
                                            'id="xs-components-links-module-ProfileModule-c09f35f573125fd9cb3499d2b972b161ca492e0804dc6f5f1e61cb28e73921136424af5be0e2f0f174b119ae13755f924ac9c3ca77dc50401e7d76f241de0df6"' }>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileRoutingModule.html" data-type="entity-link" >ProfileRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PurchaseOrderModule.html" data-type="entity-link" >PurchaseOrderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PurchaseOrderModule-e504179552e69900849958b4b7866a7ae448849d77aeb26f1e4249b5383d17a5805e1ea4d1df3ced495c2d6f9c3d56cb4c4cd2e50e246edf068dada454515f8a"' : 'data-target="#xs-components-links-module-PurchaseOrderModule-e504179552e69900849958b4b7866a7ae448849d77aeb26f1e4249b5383d17a5805e1ea4d1df3ced495c2d6f9c3d56cb4c4cd2e50e246edf068dada454515f8a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PurchaseOrderModule-e504179552e69900849958b4b7866a7ae448849d77aeb26f1e4249b5383d17a5805e1ea4d1df3ced495c2d6f9c3d56cb4c4cd2e50e246edf068dada454515f8a"' :
                                            'id="xs-components-links-module-PurchaseOrderModule-e504179552e69900849958b4b7866a7ae448849d77aeb26f1e4249b5383d17a5805e1ea4d1df3ced495c2d6f9c3d56cb4c4cd2e50e246edf068dada454515f8a"' }>
                                            <li class="link">
                                                <a href="components/PurchaseOrderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PurchaseOrderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PurchaseOrderRoutingModule.html" data-type="entity-link" >PurchaseOrderRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/QuotationListModule.html" data-type="entity-link" >QuotationListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-QuotationListModule-62b429a9db1eeebe3fde3ccbeddc5f0c48b143e441967c107cd976ada3b715b5d1f69e23e4f8002900747676eacff79599ec6464374bdcc4539dd44d3382bfa4"' : 'data-target="#xs-components-links-module-QuotationListModule-62b429a9db1eeebe3fde3ccbeddc5f0c48b143e441967c107cd976ada3b715b5d1f69e23e4f8002900747676eacff79599ec6464374bdcc4539dd44d3382bfa4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-QuotationListModule-62b429a9db1eeebe3fde3ccbeddc5f0c48b143e441967c107cd976ada3b715b5d1f69e23e4f8002900747676eacff79599ec6464374bdcc4539dd44d3382bfa4"' :
                                            'id="xs-components-links-module-QuotationListModule-62b429a9db1eeebe3fde3ccbeddc5f0c48b143e441967c107cd976ada3b715b5d1f69e23e4f8002900747676eacff79599ec6464374bdcc4539dd44d3382bfa4"' }>
                                            <li class="link">
                                                <a href="components/QuotationListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuotationListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/QuotationListRoutingModule.html" data-type="entity-link" >QuotationListRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterModule.html" data-type="entity-link" >RegisterModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RegisterModule-192c28ee90dba8bdd2f8b12282f82ac3f1c13c3de8ae3367cb6cd837e2690f153403735e6fb460047f14125af34a9bd7dae6188c7bd72b4fb1d135b8cee10a35"' : 'data-target="#xs-components-links-module-RegisterModule-192c28ee90dba8bdd2f8b12282f82ac3f1c13c3de8ae3367cb6cd837e2690f153403735e6fb460047f14125af34a9bd7dae6188c7bd72b4fb1d135b8cee10a35"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegisterModule-192c28ee90dba8bdd2f8b12282f82ac3f1c13c3de8ae3367cb6cd837e2690f153403735e6fb460047f14125af34a9bd7dae6188c7bd72b4fb1d135b8cee10a35"' :
                                            'id="xs-components-links-module-RegisterModule-192c28ee90dba8bdd2f8b12282f82ac3f1c13c3de8ae3367cb6cd837e2690f153403735e6fb460047f14125af34a9bd7dae6188c7bd72b4fb1d135b8cee10a35"' }>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterRoutingModule.html" data-type="entity-link" >RegisterRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ReportModule.html" data-type="entity-link" >ReportModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ReportModule-314fb15adb4e920d866b098ac1d2b03505504ec74eeafc6bd5c97dd4bb5edd5d176d9998b9fa6c155baa629d8ef508cfeac7025562c7e60f2b3c97d384fdedae"' : 'data-target="#xs-components-links-module-ReportModule-314fb15adb4e920d866b098ac1d2b03505504ec74eeafc6bd5c97dd4bb5edd5d176d9998b9fa6c155baa629d8ef508cfeac7025562c7e60f2b3c97d384fdedae"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReportModule-314fb15adb4e920d866b098ac1d2b03505504ec74eeafc6bd5c97dd4bb5edd5d176d9998b9fa6c155baa629d8ef508cfeac7025562c7e60f2b3c97d384fdedae"' :
                                            'id="xs-components-links-module-ReportModule-314fb15adb4e920d866b098ac1d2b03505504ec74eeafc6bd5c97dd4bb5edd5d176d9998b9fa6c155baa629d8ef508cfeac7025562c7e60f2b3c97d384fdedae"' }>
                                            <li class="link">
                                                <a href="components/ReportComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportRoutingModule.html" data-type="entity-link" >ReportRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RtsModule.html" data-type="entity-link" >RtsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RtsModule-c81a9e57bece885d5c781aa3b4490475865998912fffbf0f54c32493e9d910a0f24a2faf8033ebd7a561c6415d6735ad29041bbdf350a477bdc39ec3fd558221"' : 'data-target="#xs-components-links-module-RtsModule-c81a9e57bece885d5c781aa3b4490475865998912fffbf0f54c32493e9d910a0f24a2faf8033ebd7a561c6415d6735ad29041bbdf350a477bdc39ec3fd558221"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RtsModule-c81a9e57bece885d5c781aa3b4490475865998912fffbf0f54c32493e9d910a0f24a2faf8033ebd7a561c6415d6735ad29041bbdf350a477bdc39ec3fd558221"' :
                                            'id="xs-components-links-module-RtsModule-c81a9e57bece885d5c781aa3b4490475865998912fffbf0f54c32493e9d910a0f24a2faf8033ebd7a561c6415d6735ad29041bbdf350a477bdc39ec3fd558221"' }>
                                            <li class="link">
                                                <a href="components/RtsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RtsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RtsRoutingModule.html" data-type="entity-link" >RtsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsModule.html" data-type="entity-link" >SettingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SettingsModule-8f1184e504fa2990530d03626cdfd48008aa93438bd3b5ec0a8bd28438d437b11de7a5f5f7d35bb4ce3e7baabee37c5e8876345a70a88b89c07187d3e8589c28"' : 'data-target="#xs-components-links-module-SettingsModule-8f1184e504fa2990530d03626cdfd48008aa93438bd3b5ec0a8bd28438d437b11de7a5f5f7d35bb4ce3e7baabee37c5e8876345a70a88b89c07187d3e8589c28"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SettingsModule-8f1184e504fa2990530d03626cdfd48008aa93438bd3b5ec0a8bd28438d437b11de7a5f5f7d35bb4ce3e7baabee37c5e8876345a70a88b89c07187d3e8589c28"' :
                                            'id="xs-components-links-module-SettingsModule-8f1184e504fa2990530d03626cdfd48008aa93438bd3b5ec0a8bd28438d437b11de7a5f5f7d35bb4ce3e7baabee37c5e8876345a70a88b89c07187d3e8589c28"' }>
                                            <li class="link">
                                                <a href="components/SettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsRoutingModule.html" data-type="entity-link" >SettingsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SoaModule.html" data-type="entity-link" >SoaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SoaModule-7e0b577d9545434a5c807801ec5aa5ecde8dbba9f773e7e8de54dcc8dfe1307c5dbb013608931dd5ffc695b3b0cc8be2b9ad58c5e2024dc72003fd42e483de3a"' : 'data-target="#xs-components-links-module-SoaModule-7e0b577d9545434a5c807801ec5aa5ecde8dbba9f773e7e8de54dcc8dfe1307c5dbb013608931dd5ffc695b3b0cc8be2b9ad58c5e2024dc72003fd42e483de3a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SoaModule-7e0b577d9545434a5c807801ec5aa5ecde8dbba9f773e7e8de54dcc8dfe1307c5dbb013608931dd5ffc695b3b0cc8be2b9ad58c5e2024dc72003fd42e483de3a"' :
                                            'id="xs-components-links-module-SoaModule-7e0b577d9545434a5c807801ec5aa5ecde8dbba9f773e7e8de54dcc8dfe1307c5dbb013608931dd5ffc695b3b0cc8be2b9ad58c5e2024dc72003fd42e483de3a"' }>
                                            <li class="link">
                                                <a href="components/SoaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SoaComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SoaRoutingModule.html" data-type="entity-link" >SoaRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SuModule.html" data-type="entity-link" >SuModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SuModule-8d7102e7560d0645a31176a85a06dac95f67aae5f41e02f24782a9ec8b3b3039badc7f19e5c38ce9ac637090951e062bf2b9640e77e7e2e8a9f51a7388c7d00f"' : 'data-target="#xs-components-links-module-SuModule-8d7102e7560d0645a31176a85a06dac95f67aae5f41e02f24782a9ec8b3b3039badc7f19e5c38ce9ac637090951e062bf2b9640e77e7e2e8a9f51a7388c7d00f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SuModule-8d7102e7560d0645a31176a85a06dac95f67aae5f41e02f24782a9ec8b3b3039badc7f19e5c38ce9ac637090951e062bf2b9640e77e7e2e8a9f51a7388c7d00f"' :
                                            'id="xs-components-links-module-SuModule-8d7102e7560d0645a31176a85a06dac95f67aae5f41e02f24782a9ec8b3b3039badc7f19e5c38ce9ac637090951e062bf2b9640e77e7e2e8a9f51a7388c7d00f"' }>
                                            <li class="link">
                                                <a href="components/SuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SuRoutingModule.html" data-type="entity-link" >SuRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UsersModule-30a317af7fd351074962f77ff8d962716a37d5868ee65842c711b94a32fe3f3007d244c6236601b22b8649c29e2f3bff67e132fed8f0d90b2ebb77daa1083321"' : 'data-target="#xs-components-links-module-UsersModule-30a317af7fd351074962f77ff8d962716a37d5868ee65842c711b94a32fe3f3007d244c6236601b22b8649c29e2f3bff67e132fed8f0d90b2ebb77daa1083321"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersModule-30a317af7fd351074962f77ff8d962716a37d5868ee65842c711b94a32fe3f3007d244c6236601b22b8649c29e2f3bff67e132fed8f0d90b2ebb77daa1083321"' :
                                            'id="xs-components-links-module-UsersModule-30a317af7fd351074962f77ff8d962716a37d5868ee65842c711b94a32fe3f3007d244c6236601b22b8649c29e2f3bff67e132fed8f0d90b2ebb77daa1083321"' }>
                                            <li class="link">
                                                <a href="components/UsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersRoutingModule.html" data-type="entity-link" >UsersRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/CreatePurchaseOrderComponent-1.html" data-type="entity-link" >CreatePurchaseOrderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent-1.html" data-type="entity-link" >DashboardComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BookingService.html" data-type="entity-link" >BookingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BundleService.html" data-type="entity-link" >BundleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClassificationService.html" data-type="entity-link" >ClassificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContractService.html" data-type="entity-link" >ContractService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomerService.html" data-type="entity-link" >CustomerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InquiryService.html" data-type="entity-link" >InquiryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InventoryService.html" data-type="entity-link" >InventoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/KeyPartnerService.html" data-type="entity-link" >KeyPartnerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PurchaseOrderService.html" data-type="entity-link" >PurchaseOrderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuotationService.html" data-type="entity-link" >QuotationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SocketService.html" data-type="entity-link" >SocketService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenService.html" data-type="entity-link" >TokenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/HttpInterceptorInterceptor.html" data-type="entity-link" >HttpInterceptorInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminAuthGuard.html" data-type="entity-link" >AdminAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/EncoderAuthGuard.html" data-type="entity-link" >EncoderAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/KeyPartnerAuthGuard.html" data-type="entity-link" >KeyPartnerAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/LoginGuard.html" data-type="entity-link" >LoginGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/SuAuthGuard.html" data-type="entity-link" >SuAuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Login.html" data-type="entity-link" >Login</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Register.html" data-type="entity-link" >Register</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});