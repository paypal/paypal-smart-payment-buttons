/* @flow */

import { FUNDING } from '@paypal/sdk-constants/src';

export const LOGGER_URL = '/xoplatform/logger/api/logger';
export const AUTH_API_URL = '/v1/oauth2/token';
export const ORDERS_API_URL = '/v2/checkout/orders';
export const PAYMENTS_API_URL = '/v1/payments/payment';
export const CREATE_SUBSCRIPTIONS_API_URL = '/v1/billing/subscriptions';
export const VALIDATE_PAYMENT_METHOD_API = 'validate-payment-method';

export const BASE_SMART_API_URL = '/smart/api';
export const SMART_API_URI = {
    AUTH:           `${ BASE_SMART_API_URL }/auth`,
    CHECKOUT:       `${ BASE_SMART_API_URL }/checkout`,
    ORDER:          `${ BASE_SMART_API_URL }/order`,
    PAYMENT:        `${ BASE_SMART_API_URL }/payment`,
    SUBSCRIPTION:   `${ BASE_SMART_API_URL }/billagmt/subscriptions`
};

export const GRAPHQL_URI = '/graphql';

export const WEB_CHECKOUT_URI = '/checkoutnow';

export const NATIVE_CHECKOUT_URI : { [ $Values<typeof FUNDING> ] : string } = {
    [ FUNDING.PAYPAL ]: '/smart/checkout/native',
    [ FUNDING.VENMO ]:  '/smart/checkout/venmo'
};

export const NATIVE_CHECKOUT_POPUP_URI : { [$Values<typeof FUNDING> ] : string } = {
    [ FUNDING.PAYPAL ]: '/smart/checkout/native/popup',
    [ FUNDING.VENMO ]:  '/smart/checkout/venmo/popup'
};


export const NATIVE_DETECTION_URL = 'http://127.0.0.1:8765/hello';

export const CLIENT_ID_PAYEE_NO_MATCH = [
    'Af3YaeRfoJGtncwLeiahT93xTYT0-wldEEaiGehhGspP333r6tADvHeVCwZPR022F4d0YQquv7Lik_PT',
    'AbHo6hBEDmCHulDhRMkCVk7FDed5zE1-mNo7SQvo_yxeLvGylM5mGh5IOjx0AV9sTHhHDjD4A443Dybb',
    'AcjM7hAZjUAqIgU0Lvzneb9-_rWs7qAEl6PoPVHtQV5PNmWBihQWsu_SglKO',
    'Af_pMiA6ikCtlsNB8dJW1oG1ZI7FirXbRU43rDRfq_i_iQAPbYsojeI9Q2VzZvD1u2wKEPuaokZaNWyC',
    'AQAZZuAP5V0b8Wzs1t3KJM3opK8ueK6Txnlm7pw6kMFHrcAdFogBw3pBmeNP-234aHAZ2BlHeijkU2Tt',
    'Aef8KpflK3t-pTjstogUtqzAuk1IRGHpkdBTxyTWeARwqXyuRrX5Uj-Bs6KdMwK1g8ZhitjzfJ5jh6K7',
    'ARcLSr40hevzVXTnnNpHochqg9lsyznO2UugwjyCpt4MPnAmxgyLGC2Ia7aufLH1jS8BhOIZBnXqhOfP',
    'AYiXLQVgLszolhHbiYAm2HZERgDF5BOPXG7i4m9BNsTTSdmWhVu2Np4_GqDJLrl5VA50VDAlMMpCMArb',
    'ARbpxmp0udlm2zBPu6bqW6PAMV-UfCTktgWFtJ0cy1rKQUUtIRffwg1A-i0wRyFg9BhbfZM3M6ci6czP',
    'AeHvO7dLYAlLLnkZWxCTvHgSBMoFRn-bu1Wy9kjEXZVb8wYZPRpEykxDhLQ0WjgUPQz_MeF1e1FnH4mT',
    'Abi2EEJv7o1v6GKAE1nNVgeNqBWLYXSiDoAKi-ADKU6uRPi_41GJEMr5rjZC8fuQxAC-MVEPYSfYsfzD',
    'AW9fGl1zpjGSB474VARpj8j0hyEzrwNY7WgJCtwStaVVYkiyixnX4Z3KSe9A0jPLOcKj_2B9lHon1nAR',
    'ARBlYB7bfFnpO5IgprEW0PqtBSZOn1Q0Jly-3r_IzMEU8sPq0fdNrk1D4JgHAitxDBxfuL6wDpDvTZgU',
    'AZNQsMt_Ho-GClAUCvZVuKyz-n5rRhZyEBL2yTTetPV-lTqQE2_4quG6-ADlBMZoAgnG-yccas62Hqg2'
];

export const ORDER_VALIDATION_WHITELIST = [
    'AWU8hQWR5S8ynvUCz0T-tt2uRPzt7-wcIp_clASLr3KrXNdKcr_iPzgNsk4s3sOG2EzgOyqpeuL9Lt2Q',
    'AW2HA2wTdlPiJYixm961rEhamyefXVV4Y5CxJnRJGT_AnXVZuWnneEFnnGpDeIUZaCbpz_kwtEjFwo8x',
    'AU0KZbJCXg9J5OJXJxrUFMaCAkMvvrk-8khEB4vLyq76klYl5RSVGNrX4qh_aERn3Wsx5Vcn2eCPQ1fo',
    'AUku7YwlQ9LckQ9jBEAoDTOW_l-VyzeS2ZLNS4-kWoEI0Xh5VEFEgda7KeU3Z-bRIcZ4YzkJ6kp4CIZA',
    'ATyGfjcN1hYSg34FNM2QFpih-UgIKxiE6nC_HR4ifq2auBHxlzm7eFTToF0-GayrwDSNgwDmTYfPNvYD',
    'ARa44QaubKRAeUZRlkhqkWUAilO7IGlS6qcHJ4RmG6aaDuCAi232yOjfDwWmGJL5rdjvhaA_oHLVo3_y',
    'AZqSMr_O6WtkSWvp2GF526yJjSyjZsnaqvmp99w2gNJHtKfOdzpnNJiwjTd_yLjdf-wt2DUtJzFw16Bq',
    'AbHo6hBEDmCHulDhRMkCVk7FDed5zE1-mNo7SQvo_yxeLvGylM5mGh5IOjx0AV9sTHhHDjD4A443Dybb',
    'AZ27S6mY7iw1toHmoVzye1XwCiOJo_uIMYJIDpUwlTsG2rxTXW8Sl3tjUEwsS0TWGIkEq7CG1zXLLvvK',
    'Af8k4y06mmyTM4JxdmDUK0PJBR314Yz_nWddC13y5rHawFRREVmueGa0b-MMHl5_jvo6bMM1d7DnM2Uj',
    'AaRz5Xo5rOOW8Pq0ofvoKD5fb48gaPrKknItbEc1k79KH6z3aPsS5oUfu0uWj7BMuEru5_6jvhjSyvRs',
    'Aa5QWJGciaqznqahG4ooXiL9FNZuqEcL-vhdCMrb-jIMNAFpiG1SxW1GMcPmS5pQoxrwsOmV2KtNpk1Y',
    'AfzuuqC32z4_opOaPcCOgB0P112SCvGoJZi-79Yj5WGNoddoDQf7gG_mbGl3tZYJB_XsZ1dHDDgzhkH7',
    'AQ6b-BBBspp77ZytI3Hj0FKpACemsrXhu0Gds7ubWAoKxHCW1o7RnV76wCe4',
    'AfFU1v8QcnRtUY5xRwxW6nZlwGscc0dmMfVQP9Ce3mqKRvqddGBHnx62WhKVcAMPALE9aR1kPeJfy4xz',
    'AXjQJ2vHhgpu7DYUrE1IerCOOp9y-d8dSIMEIkc49ckjO9M04AehA8qm5jm0FIV7kO3CEtzZ8e-dp8-2',
    'AYJqlLYWc7pJ-z3rUJBdHicjlxRg-sQUPytyCpvgPcpB4X3rKZlrmJq6pQRUZ0Pb_LCV1cvi4CLGTA9d',
    'AQA6JMmn0j1yvIhc2mh0QP5HedKSpEEYQuZjHgmaIRVVlvzDWJU2twyT8OklWyz8NhVNlsKReUElO_xa',
    'AT-LIFIee2HjafB1SJxyxiX8Bnpv-bAEJKNNDFduENR8a7xGvcQRb_5QxxDq_nVF8L3hkBpqnyVue4vt',
    'AYc6HFlcGY99sz6mzMNWT10vuo6l1qwzKjlKeZ_JQuL2tkUtbKrWwNZ3pcFHZJYmFk5cXK92OodadpX2',
    'AZ8UUzGLndt7BWxjD-NobN8gFAarZV7PNN-XfBIM7_n3oU3roq610ytrpCtL2ikSOT_HtW8-2aq0HgTc',
    'AdC8njZRff48qO32BRskthX85OP6eGdW_2pwbySJl0WSa3MRPWGxddYiYf0ig9hkTu6ppWLp4uQFf7Wc',
    'AVm6hkTgp2kObqwkPrO0KZIHeREs426g_yaq1IPsoSz5ij0vOGGkBcmfIAB7ddrhdzFvDiE4S7FjGG46',
    'AdCK4t9F8PiG-Lbbpu9ot8TJmzlt6JqEjSBw0r4DuZQ-h8g6bU_RazHGajCSLfTfVtobXHH5NWq7-07H',
    'AefZb6HGDKO-Seg-Y-T7n8JMAahIQPYbQVoQdd8JKZmF-r8wV_BT8YvY1wq_6HJ3QpiGhH1x9wTI-Qer',
    'AZvPeGIweYjl7UjrBplKks_ABRUW12UVxZy4dw8bU7yVLvx5AxpP_kGy5VpnL5eiaqjeyY9bcIwp5UMs',
    'Ab1VkGmr1COkjo_6COidM4aQw32eggx3FrwdBLe_49nQjZvsN6NGFeKCiMfvgl1424JCAMWbDIB84nM9',
    'AfKPyV410xcQNtx6rx0yWBp0mmovau9eb_YyiB9uPX_lnWmXvOsdKN9HRWmEcDwcp0qzp74u_NijYth1',
    'Ab2xNfs6Tl9v49jUupCCg8Av_KDTVb1JKovfA92DPRDqjIWDDOmir3bx3cY4qLmgPxuhXNIIYm7K2Y3g',
    'AdmFNVRKWUWMj4UyEomTd0CW2hHQFcY9qB31B8PbWZYwzykfRS74Jw4vRC-5W1dScVuRwwFoeQAxFNoj',
    'AcMnb-pPPgZGWeK6bIi6sixOzjzSQnLBX875cg7XCwbhG9Fc6kRUiN7_qjlYHOX2FZMDDCXYC2Go65LF',
    'AXbYLpelIUb8i9iaFeQKXt3DlWpLyC1dc3d8WOx7fBMvPny-lHueS7DnFZnfIeOiRukpum5ejF8UdSzx',
    'AU6945tSYM7aVoRjvIEiFE4uLYn3WWXRAt_DbqbX0BCUDVfLdL_NB85NaJYRqkrRiU41pUwwom2E_47w',
    'AeLMaMHVVX61YKoNlLqoQ_1zX6MS3NBjvFZNBsrrOCgeZIeqoVwXWoVz681aMaXzSXkx2Q4CB2DzdxVV',
    'AU2UgmLki6ZfaDt27a7WM5J73IVi36nQva7oZGs5onuWbGyo1dqDf9ruVn-cgfjyNWYQvUzk54wOLgTh',
    'AaBPZpGg89TAPOa2VMaKwINvjpDh-EE7a-mZQ1vV95ZoEIz65ducH23QeIL1vPUFuuRGB2goniC9KrbB',
    'AbarfFDHDheK7p4Z-w7JZ8rXoPBWSALu91ZJXoRX-zGz3Y6eqFSzum4OyTxn7ZJXELy_tl1ZLimrzgyn',
    'AT4f7iaYeBKXSFR_e27h7F4z7h73L3-lMtH38jZh8KDQ5xp9NoTGpiz1oix4B69xiT1uFuBOI0r6_SLo',
    'ATWcvHcxfe1gfQ-znE_Ua6dVvX7fMRsdoBy1MmC_ApxPcG3rGZLDFoAkOmtJzrdRDFeu0EhXIAu17vJh',
    'AeV96uDGtI2SJMobKDHpR_IEhPD6NJG379LQHeFaCe_-GObH5rRCuP6-AWCarF2gh7dxh-si_uaWSxlu',
    'ASgMJnHCefNb23pO1tmCqWhvwT5D-opcT8W0TW2WeZXEnDw22r7epTCrSoNjKc8O4VlDLhP4oLEYyOHV',
    'AeGtpFEgJWl8EKAwx-jVRGZRy8fBYlZPG2cYL-kDJmKVv0o3tU3lOJNhzWMGjUdubmqsUtTcjyFzrsk2',
    'AUQRtcEq9z5DHLxjiSz3rwKgB1z-O-Df8nzNU2aKYxQbntIDV7rFiHGQrISElMo1JJR5N8sYpzqkq8Dg',
    'Aee7fyLlCExLFFB1Cs8eco2PsnVcNMYhj5KtFTxmmHLPGp3y2i_HyooUQtRCjKjN_445-7qjnoyR8r4w',
    'AfxJnj-1UN_l7r46FC27ufpCzt4ymiF7ctpexNeEH8hkQwJloFB5comni5SxflMYOkWnMXWTtVRzlbfZ',
    'ASCS3-SkSood0ZR2Ik8EtFZrI9MOKdEhptnQHypXbCk_z0wSICf6ElQ-ge5FACcGmtjKcV6h-xOWBqF2',
    'AdxKNW6Rvn2NyGD6r9N7C13nh9lKZnOJ_KaNAl0Nlj_csc_wmJnm3MgpyHOhugPhMChinj2Rfsr9mpDv',
    'AR5XPd0OP8aXFu_aHyBK9pP097vBH62c6afOj6sjH7KSB0CfNKZ6QIR_27rsKCZYmmCkRgjXePpTq01p',
    'AYb7yEHXW3_n24dkjn29InoA6dCPEDiKajhbrCwbIJTQfpGuzh8a5FS4MoyXyFsiK4vhgeWxtg6zuADW',
    'Afo1LVZtoaCSq5HI_naZpUMjB2C0_OiB6nNHlGaNe7jwBTunPXnbodmCr4ZTtpL3WT-4RkNG6DQFvX03',
    'AR67hODdVoxlUsOUT8BoHSYiOJ15WDQg90nkqwRP_14vVrEb1a3S4_caxBc-w51TV3AcMyACzYREtXrH',
    'AZxGGpjzsdT8yXYqFS_kp-Ai6E_7EwTJ03AoLiJj6z5TBXa6GZW5h2ZRfi5-K4Y6oLyrF8FpJpPqd5xY',
    'AUq0DPexx9Wb84WP3jKi9r2WH9xejePjH4KAsOdRj-q4f5PfwMZ_KpVhLvsJyo3lhpzqhOJEkqFspgGN',
    'AXOplj0iurFjzACM1RuuWcDRlVubsIQe7ry8SRAQg3LRVDyZbAmxOs2snzLSvNJhCtNNFANLf0cKguLe',
    'AUwoRlv3iZ3jt3o3hhcft_tZ5g6tvefEpjCf9YNGeH7q8p_WraleitkKfLnWIs8HLpzalgRA5AMT0BYO',
    'AQi-8_4bMO1BqBPldsz4FyybrZMDAeQO_uqEXfZsxgZGOrMbYl-pO7sKTnQpdsNxEgM-xa5HodTHXDQg',
    'AajSVnIsGJdD3fKO76SmA8HxLs9flPRpdLhp-KTM34I2ZZ12WqfLZ2S3zmbzwbwJOMi5AmS96jHXppPu',
    'Ady0oUeIgU24A60CEhog6THKv4rO0-58E1C6CXS3mfgBjonkj_fh6hYPP1_8qVzioVPhbX8JRbyeHV_1',
    'AW7mu9kZkNQnih14Ugvi7DmBpdouGHi8yv6DQHScKfz1pvNh7miD60WrQaf_sRQFbya9pln1JEhtx58F',
    'AejlsIlg_KjKjmLKqxJqFIAwn3ZP02emx41Z2It4IfirQ-nNgZgzWk1CU-Q1QDbYUXjWoYJZ4dq1S2pK',
    'AVfy3rhipHfrcpAARabvSbVcG8se_5Ye4Yez65UlXA2zNQAhFLwERbc7sFooSjc1pRkQDvpWM_-6UlQI',
    'AZNGPAzuZGI56_rR2d6Qt5Pg9p0EP0SlgqOLF1hJ-Jhyl7Fc4KLsW3WtUaQBsq7qEv-VcMfH3yRxckw_',
    'AdEIkRwwggl9QpNGdXzXlT6dPT5UcxS5G3pzdimct2fQlfv2e6JC-ZoR2wEaqy1VRSYN5zYATl04lQPJ',
    'AV2UhIeUzG0N23-zt7_KBQ3OhYq0ZurLSvm75NuFWl2iMtNiZr0k78AvPweLerv8DcdSENAAPy_qVHdc',
    'AX8Pb-sAgAFp_gHsk2dQX30ABfcvMabRjPRJ97IqRt9LWWGn6bsNiU1kYqMWBkRim_ONg1XnrOq9HycV',
    'AQkboqLaGeUqU-UcsupDWhGINLljqGPvy1pm6JMp1EQMcuz--sOwhOp20s0H4y1b_X6EYgUYmwl3_QbI',
    'AVxk36f8VzzEEbhmhFRdeWR0s6kjHJB88V3q1VCDDWO-vUHkpHDx5a3c5KBiSwrEnodgmIDyVrySo19W',
    'AbS9SBIomzAqKCnZgxxI922RWH4sRjcXQVkzbQoxwGh1yLU5K3NyBiIksj1qy-cgI0UTRaKEENdVA3UG',
    'Aeof7I__CpI_sDTMc0sabPC2AtcDFSWYTA-AuSX35LgSdK_nveXR1zNGPzWb5d-EkXP8EaHFvpTXOt_W',
    'AdFNiM95Vg_Xslrjr1PY-bUWGKHheQsGWo46dXPnSWfkGWhOpGqCH7SOivcQU1Bw968KwMiYIdOrC9C8',
    'AVQfN-d4gHcYcLlNAV5jcn17hiXLr5-yktBxwl_oviEHekLjF_VtiWEHzpc7qs8VBooeZ-9HNkIaZC8c',
    'AWZIhxjocZGX-AfhRrmStAUGypQjzWEQEnLV670Qui0ZdjBH2xiXlCEpnXbaHxxwV011ekhRWt6kWQzy',
    'AYJNkqXTB-LbDWY-geBeteUhFckZhmKUXoQm1EKrHFs_jT52-Xs9HrM4yZe19i65TLy-KTPSZrbQWL4d',
    'AaJdlGSlPSHCXuUsoizK7BX1gQGk-LXzvuTQuISXPz5aJf07UXhnNZBXHnZ6PBIGgPSLz_ezOW_JMWI5',
    'Ads-AIlYmzcupU4h7aNwYtZCoxFhsytxkGRc449oi4KTs8JxxM32te5WnObdQ63roSR6_ap_RX0o-TyU',
    'AezPnqbw-EqAB-3QxkcQzOTFu_BZB4p9ELEmDvBRIfNYi2MktC4OR3ls8-kfoRucnB7oQoZV_63a09RE',
    'ATqRzjL44zV0uvmI-I8UXaA7aGN5UgXaIYvPnXot4EhMOFhL02PqzVX5vFPJ3I7Q7ezYGDluKsYJbTlb',
    'AQb_uhCxkswoDV-msDRSEvBrENNqphJo-cGxMJ7nUa9hSArJhefMfdMvtVRN065kc4e2jp8rJ0X8yQrz',
    'AcxzPl0cMHMyjC5D4uMaQZ0oqjNEGNItIbUgeokdAXzFs9Tr2uYJEe4l76DUh4HnX0Bz3XSYR0Pnwn3q',
    'AbBeFZDAUYMZQ-EZMFQhx3K3_vvX2tU_45Lq6G4PrAzgP3gp6UfyaFVEg7DKo0diRDacyhcJO5Bpxij3',
    'AR337Je4oqSvRgX7HjX2Sv7M1VsK7Lme0WBssuEwW66bkphUUWw-JjjVvHNW4ttTdikGHraEBfD3pKcZ',
    'AXwYaDB1wXCQLJsQwaJhpckEFdZmuZMohfwEKH1vTm0Q5HJTw3t_Zqllc0unozCPPR19Ahlq08vNsPMw',
    'Af8uKf29kbmHdbkYF7rCs4cAwupeZQZ42HBlOTv8C1cPsQDleyL-KibrX2rI_qxUfPXgS-AmUcL2EkCn',
    'ARqhdSV3eoTacPNpD0m-xMnGuaYsbdCi8xCtAM_NKRqiZ_Kj2GcmrnpKRJOimbS4Dqg2WBlMZvM_a198',
    'ATdvBkuCmZU0bTUYpr6UZH43vK5293QKgxGkPSYgfr5zfib2PbHNeYI_NSuhsJkiGiQqCAMLkx4lSffx',
    'AZHX5-mWu26D4D6Ocw_8GxZTsvGtlFCm_clftgJLP0eixyZ0rTbVBu-T5RpTaw2JYXK1rzxIibE2wUcm',
    'AUYwY3jZaHqT-hh5Ogpy1WkNunjk_AWi9pjdm21kb5GFOyJUnquvZeUx1jPHLYSwS1l_pHvWudWZUocs',
    'AWkpAaV7rEJCfTdsnAZ11aisQ_SFD1MPCt8ZLZXRga7acQT2q3UffhOPc3ei5hoW--H3rXVTlIFnn1jM',
    'AbQ3QKqGPFeBWir6QK2na3JAFsMp9scbSOeRi0_15AA5q6XMi4hTRuO4Tmme6jmAi3SvRY4PTPDEqY7V',
    'ASD3LOuSg39EBl3Pd9PEZU6GMkA-yIJQhohSF4owo2fL2eelnrgRYQKYdbvtYI5O3IDp1Pw5iqEv5Hbe',
    'AVRFLjMTInsB9StyuRZltkDbN4Bhi-QiXcIeqPO6YPU7GSOLR3i8F9f6pVX38_EkmDhIpgXM-D4GnPdO',
    'AUoMvJA_FdhFwJEVL6Ri7YhdU2nrPQUoags0yhV22_17ZgWmfvh5Zqyyxpsba-dq-LH6w0tuIuEQJ2bp',
    'AfCSDNtSCNV6lzSOqF3jTnR2UHPdi225JVtSowAVEcDi6KgBYBP19qnwT14_dMcALbArsbQA1s4vVGM6',
    'AQUolB5X1HACW19AGVFANA1SuuJOArLYtyJ0zI2yvD1jVxgUhZbl4E-m4ry_emlAEsik3xm4gcvKKL_B',
    'AfWrrGm1rpmDZGvGBxD0UssB3Ru50PGNgIcaWOpAN8mFGGkgl4Othmu8kPlunsRgR8YwPerYCdtiWUVL',
    'ARnCYfY6j3qid5w7dQHUMtoRebesjooa-ZDvw-sgChzdIap0eGlxO5rwLQy-TwKB9FNtMvEaXjKOGatC',
    'AazXPDqbAnyE6iEbvPw8wYi2YpjIJkRczJUF5CiSKNoQ6rEmP6mMzwAlf_KDRzTazEUukaq2feqcYYuG',
    'AeDWFs5RFH33pB3skuP1M57jTWgMHSuKFMxJtkMddpYsR7SSEBanfqI1RN7LlRaQ_Jmjxb8-L_1dbIJW',
    'AdfXyxI-oHYghKou93lC4LRkRB0OP3-8h0L5srBeDzUYFwJ44_Jk4Vv71CKt3BlMUlGUGseBIoRFAu0F',
    'AaXrMQuzMiglUVTF6DWsGEXij4fOW_IQU5dZ49WvIGs-lBMiUtPW9PSVX8jQbwZZsDP10xEpAjUllgcr',
    'AYSLmzwkSsjQMKrDgKGmAfYjO-xr06W3-WWg0DfayGHeWu7Im7UB5eetTIHUso6d-zpcE_odqb6doeBz',
    'AaK4HlTbGd6DSR3mnUx7Xhc3DM5akcMdDQpqnawV1O2XkLZVuAAsHswM2PK8H2UBsddrcblhPgGV2PHL',
    'Aa5ceOuSFIsr-yA7Xc3p-3ZAFogzycThssblaTOUd1JpcLOUX8LUXApTe2m_QvmjAovdYcs1YujLvRtu',
    'AUf_Wbw9mq4zdVOg4XYC5JHrc-mGolFDwWF6ex-l7BA8lxCp7B0VKqU7BpQWlrfCxgKe5fqRL_N7Knz7',
    'AUH7PO7l4LubjN0ogPX2GY28oACKu296xjV1a0yRGWdd3EwfBmOyWSYO1doaZd0gx-Bx7Zao1SsY23EW',
    'AbH0SUlVzrLY0ldQG026EbqR0lVthG7UP5XpZGjoyTAUxyDNPvtyR67dcUSNLxOZSX2TLgNIRk5jX29D',
    'AeadV3OUHInuU5wL-D5zlR-luGSVIfX-nA90teNgJQGYscnG0RvVnq5eNme7pnHtcVnRCBVl4itjlG4b',
    'Acv9CfoOzVZ-rIwwd3xF6KK_meBjucMzn5m8LdlYHPr4sHr0u9adnH3DOlNrUA6QolpqhGEWmptO6lqi',
    'AeLH-VryI92PffbhsBWgsnhFBftVk8zwbupdi_LwKAQFckM6OmwTGbKWOOKfUz2LQctrtvVygNvs6iXf',
    'AQMYXqEHnLgLDn2Ke_4SefTHx4oL5pYbEmlp3g0D282gED7WCCFu4C6uMk8OqHdkTQIYmd63cr68_-Hq',
    'AT9wpTr3uD58XIjdJkQd6OOh_m9392fPJg3Oo1mSki98E3OvDqVw2U_uBZ4YltQjo3iNrn7ZlRz4JjGS',
    'AUqz2lilNW9t5eMx1VEwCMVSDeMHVas5zLpolzIGLDOjaJgS51Yy8fep4KKNQTUi-fj9yO7qIxSKRN23',
    'AdtlNBDhgmQWi2xk6edqJVKklPFyDWxtyKuXuyVT-OgdnnKpAVsbKHgvqHHP',
    'AW6_nv9voVzeF2SPx2CeIWV3AYzNFDOiPOmoGtiRwQB6t58EN4ix_utEKqDHSAQUaxhYI-AtwnoQnMUL',
    'AXVv0WVqILDE_ALwvlqIuLMT4h_2OCQu28rZyzN6VHiB9dFlPFJpWyoZnkzUBYIbuuYwdxfNZPvNwqSJ',
    'AfcRKeMgHWWby7ltUUzqiTBoHmO4aVrsdNpRZVBiEZt7U56nKUGySIyNSK9m2JvCQfOGfjxI0oZKAYmS',
    'AQVhaTnL5pyyXwnn4D8pGfZIpSASJ3hvCfE04-2t-oZ5bxG0Br08c1v609avdfOd8M1jTGaAMZCu-MLa',
    'AQnAfBfkA8BoHKE63NS_bKyGpVaxxmgRfPzgxThwY_N9fTSrSITOKSSv6OTrpGHiSrA2YbLKo_KB4qeh',
    'Af_pMiA6ikCtlsNB8dJW1oG1ZI7FirXbRU43rDRfq_i_iQAPbYsojeI9Q2VzZvD1u2wKEPuaokZaNWyC',
    'Af3YaeRfoJGtncwLeiahT93xTYT0-wldEEaiGehhGspP333r6tADvHeVCwZPR022F4d0YQquv7Lik_PT',
    'AXg0AmHuT2a0Fg8NXx0SezjfLG9UgmLK1qE-fUfbAi6fEF1mbXWAcfp0-rlzFhWS-K_aXveJ2_h95E4x',
    'AdVBcUmJoUuavK3_TQkaUMV5S45EDAsY2G_GN9dw3MxbtdUeEu0Lio2nATu-cK5PUGJMqIUME4soaaDr',
    'AVVPnV2oTAsBDiXdmLnZxhgnVpGlYkMlByGm_SzWg_3e85tbRhD49Ix-Ucx3l0ib9BfmZykje0uV5KzK',
    'AfWrLXLdbApBAVcEvM7xmQwr2QhHMk6jbvAx4jDMnS4QGmkdxQ5uKDfwOV0jHyPC-0pRSisTRpB7sEby',
    'ARkuH9nh8MlJG8zEmVHx9jKsi8xWHR-P_1vWD8--7vsqaWl2zBO3_TAipWc6f9yMHmziI_0blQqViGFG',
    'AZgBvhDOw5FiH6rL1VPNaAQ68dmpMaAO-ZI0rg_QWC7of7SLT6JXSAagblw5',
    'Ae9ydowlZztIMFy9HbRaMTyLDltKCy1v-8Ip6J9WkU4WUyWcW_QAzUnMPLV9cxy6czPjtN21uddn9IG4',
    'AWWh5qDSn8fdahjjO4AJ_GmbyXjb_Qwrmk_Vtr-d6TCb6IAyPUItp6L7iyZ_KgIBxBhLLHpJF13xMhXl',
    'AaJ6YsPUaMOVjHH67sM0pWiAxlGU5dMNmBHMDu6IxpxX4RMxTNwHShxDabIIIoG_hezmQ_bLwBl62Zz-',
    'AavIU-CI9kUiQ7e76nQrNWl08jQdsCSOALmuWJ8cN2rpJwKNm9SLcWyJNErFLNNYvXjRRxVVnJW-4iRw',
    'ARwAdSLROuMQJ-91zD4w_-_Pe1FkBJEgTpKNw8LZKCtoRxsq5cQaQDcOW3V8QAziiIlp_xAr0iMhL5Y6',
    'AWpmV2CUaza_wgqCWG5df8LRAgmWyD__zhsJJHU9TOdqgZs95mvuvMRmaLPlYrRJMaVVy8Dz-Wqkmute',
    'AaCbDDpHWz5anhIQ_Ge_RmUqTLguwXwCrn5U50KZt7xU7tU3tH411rCyBuNYCaIV_nvgOvUNmI8YU_Df',
    'AfUEYT7nO4BwZQERn9Vym5TbHAG08ptiKa9gm8OARBYgoqiAJIjllRjeIMI4g294KAH1JdTnkzubt1fr',
    'Abu0Rwqhorsjm3yK3OVe-Cy15saxELijgiA8yWdGveJvDgevs7Nc_P-zsHg5tCJoac4mcjTVjGuJLBzA',
    'Ad-_JWvlIx4ED8vWip75RskfgcM1JLY3NnAKDoqDSBr9gxXVR1L5kVFZGqKHR_lIQO4gY7EFrQz7O0pj',
    'AZh-q5bJ1_kWDREHUN390ffVG-ubxGxHB08kvHlWETqkleYtWWhGge8z5nKzfZW7aM-U3R0YJTmbfafh',
    'AZymbWti-n22driaG2L7G7NOyQMZgKumqw05JTSIT8_MWMGMqsWdWR4TBo_e75oVkMViBe4zjO_DDmjI',
    'AdRRy5qiC2TsP3OtbkgwRzLpU8WqdAjVf18Me1BO7yRMBHK1JVHXqlr8XIIj9qagyePiG4_Z8iZIgOmm',
    'AXjYFXWyb4xJCErTUDiFkzL0Ulnn-bMm4fal4G-1nQXQ1ZQxp06fOuE7naKUXGkq2TZpYSiI9xXbs4eo',
    'AcSMCRA5xVRrJ7HOPe7HFj1GicmGAUIKujZVOYnDD9_Qiz_HYSrx3RlAtVwf',
    'AdZYKRBNf1xFvz6fcYRoTXlmoBg-acv-dakLzJTtaBn0cqNf5M8Z4OCHUBMv',
    'AU-ACu0mLYYRgiceSGEbzYcX9yA5bhil5ICbW02h2M7cbdEwiAE6akFH8NgRuCsT6dI33gzZX9zmKr3M',
    'Ab6M4m9Nok1o_LOQq0l1Sc1fX8aWo_Ce0Mrjm15FyXguNnWzgHOJOdWKbz384w-Ja5FsJ4IXHScGwo1E',
    'AaGocs2Ps2V3yhN7A_lS5SdS1mF2hxmUZ8SNBCzFHf0TUpGdkmwEomPxENzxR8_tqYKcwgB_TErnHCX6',
    'AWmkdE5Z_AhcR3GGOophAu_qDRHpOh22NJBB-0QjLFpWFo0aY_wx1UBwqmiG4OY-BFkS7L0gXY6gSmu8',
    'AVt2-Fr2w7QVb7qxDp0gHohDqZFQKYB4MgUs4KULrN4zayXnwycugMykkE1zUjYJBsglaAWFGs_U8UEt',
    'Ab-nG3JqVgV470TB3zmlXXMt9vZvUlOqNGVMkyu51ymtw8MESNvwkyFUbERwEU1obtLJp3g1V30v3lLQ',
    'AdTMvLUejL5-E65uSwBZnRjNV5JlTrGMvEQEwhMLU4dhm6cJTfgzHuYhKt5r9vfKlwNyeieq8-ZqdFGW',
    'AQX-OJLJe2aT67e4nouWcPdrl4Q4uqOMoC5jS0otp-vX7ZcYM_uQQQuFST6l7QKtC3Fg378Bh1c6qtXr',
    'ATDAHEYwG8nsvQgqf9yTWUbQ2iBfounObrJWfoeoEWoErLoaUW_rMh0i3o6uAN6XfRvU6GUnF1gRHL-P',
    'AURDh-fRhpncZm8Y2qxh_fj9VaUH2fTeEGvA9L3jkak1vfhISEDoWTsmYVfj2Az_4nPWaZlPwi_obgTA',
    'AUPF8VFKX8BsjR3ON0IDB71s2tcW_RF-q-ppFwFU81LfDUCyhPChAeATXYPeGsgLIlB9TEN_bkh-_ASb',
    'ATr5EshElZhaC4c0e2_ZwaSwKb0S4RKy39g-4al7OUYUezgOuKV-IQdyLesPj4axzgSldEzLbWAeVYc8',
    'AfPnJMClV1R-CNXdpctubgLazXxJ5cUDPeImRKZRLGqWep1N4q22hEDtfXC3R7daG0JdtOO4vNqgKs5L',
    'AYphQKIxbbbdGutmpobhIbo0jkFSigSIMCE-L79h71YBjzsBjP18q9RK9rgeeZ6APprQ9tWAFf2FNGRL',
    'AZQPVKeH0usLoAuZVvn8_jOGHCT6nP7pySllud9Dh-sbIqi7kBgDt9Xs6bCxEhCpF24x1JieEDdgn29S',
    'AUcaacy0l8SHnxKXCdYaZLHcrRPoj6KDxw78tHlZ6zaJ7ALqeIx_rXfkXZ8EDH1DgSfZIAw1r92NzFTu',
    'AXz-FTdsaLKAup3SCFE_BBHjr4vtV26NLHt-oSvcxhqjBUjMKiNM4xH4zALKTyiu9_E3laCtgbn3_Zxl',
    'AeDCkxuOsfL2RdE9qGK7pqNOMvjknv02TZnIBqj48N7jr9EsNuHKfvO-2Ndq62It-TtifNWdALIaly5B',
    'AZB6Fi32uCC1QRTPi98AR-yBdDyiYBlW2iybmv3oPv2ka8OVM41OGW3N8DICRfZg5kvyjpdgizGxNpO8',
    'AUdiNR8sRJIYiwA02_4UuSjRRUvGUFqaS9a-xJQPRBeJnbZKY4DRBPzc_MHkoHN3parC7iaUcSZoUNHs',
    'AX9Y1FE6CmttN_PzOo1rDjjnmQrgU5gTbIy29G56vnM4imILXMW_9Q-WbFw6Lqv89Au1bTETv17YZCCm',
    'AXw0UXVUt0zPbf8zAeuYUPH5Mk6yWbGk1GFXYrKAEveUJiC7UCmAWPacs1-ri1Q2ACUNt0fVDcxY_phQ',
    'AUTeu3BWbHn4Z4sH_fAF89K_WdAtUIe_EnhpGlXrEEbj4MpBwbs8VCbwCGmiOzSRqt5zu37OihWxRC6I',
    'AV4Y0B7PSyc6DW63gsLtgk12P02kXFcdMJSt8LiyUuiAFS60z22ZlbYNLOBaaegHENNTEFsWX7n6bPP8',
    'AVEjCpwSc-e9jOY8dHKoTUckaKtPo0shiwe_T2rKtxp30K4TYGRopYjsUS6Qmkj6bILd7Nt72pbMWCXe',
    'ATLQ9jIClPt9QFPCVGFNaODFlZWIkqGv8os6ntTK-QR1iTRbMntGtvuJNR-z06QIrsPpe5ujJrfJnw80',
    'ATWCV-slH_K6L9tzvdm-comm1gpQqHxji7spHcfGAARQ_NuMRRYAHR2gJ36A3okABucUuImSl1YSqnv4',
    'ATDgSNqwYRLEEOrMHB-5Tx-5GxRZB5WSbi68NtIvvGovxOAfSxNhv-gFulnJX9AvMrHDacpPNvnpUOrY',
    'AVyrz3xlA7YsPL9yRG6WTJTJ9JA36ulnYq0A-W2a7-FQHagTd-h2XEnslSKWN9GQH__VVTjcGZWlltGq',
    'AYrt1t_Rn_Ce-988DREp5bsPwGCoCdILPsOEb0Jap_LBWdc-E6j0AJ4jR26o-Bhu6HB9rhw_XdO4S_Kc',
    'Abp1F3rN8bSojLO9dhYwEaPStHml-OckvsXx7D_B_gqkbCTGhKoI6UCzN5oVTAwMb8KO1KwWg5GLz4AC',
    'AXY3oISYFxU1MqS5vG1QvFkMMwym6A-EDTT8DFJIq5ZWlq3OIoP5yX4wNKKmKKZ4yxTHCocYWoPAGNQX',
    'ARcf0pSIWH4zw6SnO-MYJCEyU9HexIQ9sYrzUE6bRsQJrP-95zmlGyhWjp2s0ZHLoG4nF2uyQPzvVcfD',
    'AYiXLQVgLszolhHbiYAm2HZERgDF5BOPXG7i4m9BNsTTSdmWhVu2Np4_GqDJLrl5VA50VDAlMMpCMArb',
    'Ac8X-wQoJRqcR7hjhnPl_0EAoxHuj7pWE8PFtBU2xsvcL94bxepJUNj0awMrs-o0uMeH1pqxZvhOwr7Z',
    'AQemBOgcqnwET6EUgdQZHNXRgNZ9pPFJalKsEKDL_YlfpGEUyhLBj7BRw7xWSB3iq8Q6gIxo74OSx32k',
    'AerUB-6mTARcvaeXjg0i99oWQxLi7WrHzFo6vAGYwEahSQ3cOOxA6iXfvxfBsEOmsfo1tfaK6pKnl4Kw',
    'AUiUO36J52hSCkhaMPLWedP4yIc8AzYxQf9IWwI2zxv_mEFOr4S6v8JwAmKTPztnRqzLneQ5g6D3OZDf',
    'AZqMhoiURMT7qtC-gKxZorl3AjLOxAqz04Y03kRFzSBnrWL5W5FEucdVk0EHc6XSZ1DD3lV1O6Ei4T7Q',
    'AYA1kbHZEGfgO0GQZ2AmRZc4Pt0xA_bjH_04oqwnN_eHjiaoLSR1SQ9agvNDB8og4LZEHHVK6m-r3XxT',
    'Adm59IrYvPigXwV8lVehwwoToY62oxUEWZue81iqw7fx2ogOvrqbCv2yKAVQaMgt-YQjfpM5mavPDWRl',
    'ASHRFCrZatJJD779KhJh4vReZxHyjkEjJqOcH51HiBdN0VCGPzGsY5qcsyKOanBuLdRcq6DGIxMkIzdE',
    'AUC9st_MCkpnFj5grSnlCNOh1ujx2NsAjMyctoMVNZy7P5p4X2suh-XKAdfP_G8G_ttwARjVP2qVh5_U',
    'AWD-BLYAm7ZItS5rqG2NwudODLJwEjzGPZ7mmeJMnOxYdXVrZj_JhUpgrnPoGPS5DdDS4Wc1-KjIEnkC',
    'AZ81OGWmwmMz4z1H8LJlowtkiZMpLGDSe5L8Mkg4vjlOX8QwhzMB_H83KpHNPOLSvCJ4W_zlhDQ8JXWX',
    'AbTZGAAj-YmmToFZbGY6oerdrhM2VHZAHhSj9ou2WRxX6deDa-kksuEJorQWte6VMT41vx-cORSYZLpU',
    'Ad4njTiG2f0fgrygZXIGwnCB3p6BflSSVDQROEQgofSJZvAgrYFQtXejNTiRYan1AWwRH1fQF9U1WcLV',
    'AUFWrErwbbFvjbcxeYzqEWMI5G0w_LP0B-2wm6VlyxNhcHyIdlDBMQmKI298W-EIE9Z5dNdP29EzHSY7',
    'AYMn26-nPadhPzVAH_RPfIXaYMOGtZgPnsSs6p_ieUsM56FipfvZn6f-h-tqe1ZsIejirYnooAYnPrpz',
    'Aa3vEKJmA0ZOgxcPLPvVLrdcIjNqOUXyvcJxJdE_UvJB22YJepjDX-uJmaP3i7jLiePb08pTMuSFU5by',
    'AezgqjuewrZjjN-whkJhUTFLg_wP-hPWJdwa0yPh_rnsJtcAwltilMGjQEJAa5lGmFKwgMEqzHmU-i0e',
    'AUPjnwsAZyNIPBNY1lRy_zDafMe14VrpcfeIp7zznNmd9zBPurPIP32TKV-dL1xg-dy42eZJdlk_0gDJ',
    'AYmOiHBgeNwOszgNnOKM1p08gdtx3K7Rkq0Iyf3oqz7inUaZZJYsXzueM_ET09hdjvkfChbbMwT9n4Z8',
    'AV16buDgQ4t1rLTlRLALiK4l2V-bBXbuexvxGnk3t_Tu2GUYG7tCB-tTPG5eD9Lz2juWTwUT_i7Cf4jz',
    'AXRILPvYUu4SLa6wG1z4n_1DsC3_sA7_asy0HYm1rCXXnRw1v9Sbe9NsGDLNjrE_8GL-eVw_YDjlTCrA',
    'AfKrgEQQWsMUR9wtvQmB31X0T37HEZ3g-uQmdMPt2B_cphEkyID4sYZnDGLrFe8cP6Yx-WSTqnDZ5Wgw',
    'ATJBc7APFn7FuVkOvl2xI4b8NfggI6Us5KrHlc7It3e6AOUSqGalL1R8LNQBoxtFzppb10lPKwAbuBUd',
    'AUUoVCSxi2WznYhlTPy6x7oxCOeuDZBFy0iCSrgHg8mj1JBDY3_dTkS7rhFQnaPRh7EG929pfUS7hjmD',
    'AXircH2zJ2lUmvEMsZw5HWbxPEYF37ZcRAgOfkjf_wVXPJCVecRES3_gEEi8uJMnw4E53Ho2gVTb41LZ',
    'AbOUyivVwdLJoOfhVYz9Qw0YL-rz89edlPM3S_vK041Rnz2t8hxtvmFnhIwv7CGa-mHoIl2354UvFH7g',
    'AcsCdakTXBXS_Y6WfsGrjw4kBjzcKsyNBdA26LiwCCo-23guumU93tkTCxg9Q6XadSuCkfbn3LURD9hf',
    'ARyG-7O26qHxhBX6Gv2-HzXu-F27Tu9KQAP8jJicb7Gpik5x-I4CmU486piV3iQ5Gu4qkYOWUbvBaUF7',
    'AbFEddN5fdmNJA2-pqMsI_ITOs_Pcl43tzzjsru0ENbtmlW1C2bLpk0oThT1qNL8tgmPHvc4es6j_B9B',
    'AcACdB2RGxb-23peUt2ovwfDUXBYSGbBlv2iEsMOV94YHcKqj4ATAGnWYsbddFAGWR1HtkbGo5ASw5ao',
    'AR_TEvkkg8-EPqsZr1iMYADrr35BE-JDN5Puwugm3NF98k8tZRQW_UiFa4u7HolQHThYxd1n05Wtxs9D',
    'ATvwK90V7SFihAVdjTQlIGsil9oQ1uSHT8h7GRM-ZOowkAQi9DCg6JAwFBpt6azdFFiriWT42jcvIjVe',
    'ASFwlXgoOm_Rpsu5f3Nj74nTgbIT_eD27oY7vLsEZ2ICOUOtBvPBYHMZnxhEKRNKmM0tCqf0-AxWUVH3',
    'Acn-VnbkQeJlIfc-pBgbQmyginPTAILbLKiMFrOH-LBEa62Yyc_LdEtpkd3iKtJVgtkJL59MERCBSHas',
    'AfySg1lo0aeg43kcf25LLQhxEbSJGU3fmgldk8sVu14EERcjca4dpHy0c9PwTo-oI-y0gUK__E20ustG',
    'ARp4zaq3RYAZaNLBnOE3xfpZWzDAO_oWczsJ7xcpxohLyAYz02hndRARptVRJIUc_lp7TwHvrl92U87J',
    'AVZDQ7ynJEI9MCy7bZeDPGMSC6xCYUBNU4QGi2lWcH01RqoIqJIL1wE8IdKRBaMC7G3aAJXDbSKuM_PT',
    'AWhQQuykpN_nyVKTgHZeviUEtQ6f1O9zu1Ygf_OSsyJzr1vmNxU1ouYkgMxlRHEUQKEnGJ-p6EyabmQD',
    'AX7oINKfpN4DK0n54Qa7cg1ba3mRas8C1e49Gq6Q1WXdenjGlJ4ym1cswCLbRFz84c8ORgxFfMBeXSPB',
    'AYrM6JV9iA-xCCU1xCMvA1DePbwK1L0Z35aaOK-li0DpX-5qhZmO-0cHx1UdrDYTThGsUZ6858QodAfD',
    'AdybeG3hNG3xDrQ0QNDw9Rbjf2KMxqoNn5vbNYhgQowqMIlsvvz1X3jOsaTWu-1TM0NnvcSsLm1bkNXA',
    'AWJoAvDUxeoxjN47oBS1KQCHP_lGDA2pqLXBahns6PMmMDBgHYoYmF5zZoMiOX0m_60MAux6DuqhbuhI',
    'AR3dGJe8zToNs2fp2XT2NTQ9NVGuGeNzzMO8Z-uuncYM-wHJ0QTclojSh_dwl42G_hRm0_S3zKMgqC9E',
    'AVJPoSO7nQcOwfC8mjDFlYZd0hB6uRPXn9bMaXC81YYV-g-MXziOdXFmk_nnfSrOGcqxh9mN75bVV2Ak',
    'AZdKwrTwEzQ8XxeoW3-dVZwvoXEb8LJVqCoM-9fjEKMa7rO93dREWhDHFx6xWu59fsDpxXidHxFpv2s6',
    'AfUHjf07HcSdnyIVrjKMGKrtwNcNTDi-3QEAJtkJFi-l8vWi9XbjrUbM6Hr4PbOo5leBKl2bL53dHLZi',
    'ARPe6sWG22KZp0YKSbebgdaDblz7a7wyex_OV7_4zSY5eOdLAtz0okSKznOwkoX0mvA6W-zPPJppY96_',
    'AXwCJppbQ9ykBy4P4NWNN22x8KsyKlfHdtMJCLeN0_IxS3YJGzMCTOjfmTimrQJ-i1bqkFUJcTP1eww7',
    'AQL96QrjY7kmWnxRgYQtKgpnyBbd5MGyF2XinDu2vhDT4sYS4nnCE5bcoogXK15Q78zHiK7lSK9i8cLY',
    'AYraDnKk5Rqdlm0ZPF_aYLDWlCAoBBbpROZ7hlwbassgAw3-SXHJObcFTm9Im7GfyT_YI0hgAxkZrCe-',
    'AcG3yUDIcfKxr_uumVTtvj5bpENO8IT6eI6oKSlgVDkrf9ZshIAh1m9TObJqdOUZz3D1Qi67-dyRWY36',
    'AQSgGxsMmajM4NvcuZUZ0fUzSHuuv7VPcUhUoDuN1lwT4VEgq89WO01CKxqK3vVjt7_c4h0VLPchKfsw',
    'AcY3PqxKJN5tvdtds5nGpzLiatwiJznJYJoWpG4scbLnfPyG6eHeDPQ65AmoEbg7ic7JPahPBZRkjSUC',
    'Ac6ke_AYE0zbyhhPZYMA3oaIDU0RRU4xSySelFvMVoe7aZyUk9KqC51XnTf-gkvXQ1nDBEh9zQQMFzlA',
    'Aea-KrjL-ubqOR6RcqaHPTFWJ4QcGfsx1t-k3hDL52ZA1GIp0YoSvW_ykkRHMiEaztr2aupN0ev26eyD',
    'ASZKgb3hE-0wkV9NCG6Z_KL7lTaoA896U21tg_zeVDcJqatd5uXKlzBTQV4t60TYdcObCvoaniK9C-pc',
    'AcbDULRdfjY7w-DS60g0-mCXwOJQNWotOZes7mlwT2VCsXyAwdvgPnAnphtPwe8kRiol5CkNnrV7ty4h',
    'AdKY0ce1_Cac5x9xIYMeLRXWQb08bCvEFvaOgd6FKT0EpZwxi4a0QQ9DYB8RcSda_x9hGZNNLxX5ox52',
    'AdtmjnhumIVf512r9eVKWUSd-FB1m50_qDGaMddykHwE_fCzuDkKl7lsWk7VmDVQT348tjSvK0xWWqxW',
    'Af4Q8vg0vQGDOS4CZCo3lRGuxa-0uCea8ThUMVbj_AG_va0-pwbERM6DwznoR66uASQJdR1iCqiAOlY-',
    'AQ30yLnZhcxW1OaYle1tKeiYOBbwusFVu9tKAQo2B2gTZoyM6qIWP1cA9aBOwUv5v7x-Zymm3ScDc62i',
    'AWFgO9_WbDSGn-3EoliV4Xe5tUOVjlvTxzRD--a6rnDEKWsr1DzaR01XK8DhXCu7BulgWxY-3T46GddB',
    'AZoLIJ_07qZVfTVNFg6zrb6X1tOgOwz49qXKAdssCOowJ4o3QFwUSOAVZY7WA9t2JO462nSvIxmg8r4c',
    'AaqFBIll_36pnXqDpUctsxLhL5mGC8J2odsn0pDQIBkidfb4St3J44ENAujonkUJWt8lePJ-7mSBb2gY',
    'AeTaeY1w5wt3je9FFRRE1t313-vcXeS5hNnoF-uYB6FVD-ChMmhhy3EvCnozTH2TnLXNldFwz16d1b44',
    'AT3e9Naa87eXT8mQ7OakeQCsih35N8VjJ6sLA0hP9zDcoK3fcqF0HpHa7mbfPEj2zqqJtyd8dRECKXKn',
    'AT9JbsWaW_r6I-pzOuZ0zs3VD2CG1AyOgDUOBnMXAno9TjPZYOiegXhjMbqUmAef5783n6yRz7nMm8mr',
    'AU1f7xobnegPXLuqQq2o-_nS331U2pUmWxUuFNlUd5QYLwUuItn9mok1Zh0T57FY9nE8YI47GR9vsZDS',
    'ASDT55P6Jdw0oYgpftSjw12L2wcl3LKRqiO8hCnx7NLqc0SfWstmVmcoLa22R-1LVKtAcexEBP60HpMd',
    'AVMDh4hHgdV9v5DSD2GfBRw2LCz3jF8UBDr8qG0z3pGFjWNrBh8RqH1hrzXqQZ3TdyqsPjuGAH2GvzoP',
    'AaghtEu2Cr3W24akci5JY2StSLCb4IhD5BrCx9K2z242JwKzxnDrsZx-va1mTUu_FIxBTFEmHDZP9MgC',
    'AaWFb3GC2C5C4Wmky3pQ1LNH_nmE3Vwkj-LpgDFPT-vWBNgg09MOLtWbNN4wu6fjASkk4DGpkcK1bbyG',
    'Abpk6sczIxGd4uShN1NF18-Uu45acQiqIHtEhblwB7fegLhVlzI5j9qmAl6kxM_vMaIAEfFFON9Go-yJ',
    'Ac4ulvdzyWGE2CFo5xV3nYhwkd0CrALQleV0oImj91NfzxpRc94iyPHoQzrTUTJ7WcrgSrxjc-MxbAEY',
    'Advgqk6L03sFnkLl6UXmlkAwozU8X4RmqlisNUrsk0RFqoldvD6W-ZXVdghbzPguZXl0ocnSLn_OwK42',
    'AfR9rDd35YCFWhtTa0VaTRhzYWN1d6bNd_4EkOFFEHRLDsyzKYFyzCuwX20MgTYejsUje3274eTVRQr8',
    'AQh2k_kNuGS1cfbJ_PlYg28uPkvk9QHGfX4Pft7xY0c15CRBUYwiir01am3hIXcHLWqG_oS3UYan9Gfh',
    'AXsdF0L_Fmdcza2k68VrKLskKuocgMSZkfrMwrgSuHvLeUNCPJGnIHEG4hmxbDthJ5SPvaorE2qFe7dQ',
    'AexgYDRBEwcfrhm1u7-LmGDxEtDZtBKQb_PITb2C6_ZolyS5BaIZgfLHeBiHc_G_vElZUqc3qz3lEsPB',
    'ARePeTtGtCKd_jt4pH_nQrjW56VjnNhfgJEYosgwtxafxaEJUjabpnd-Xxls40tcMp88eq31KBz5DWrA',
    'AUaH1R1TbCLQM8Qi1V6pCIpkQxyFHKQMoNAE_-Blr1Vhlssr-But0VSrlwk_1d5E174GmBjB0-Ulqylj',
    'AX_wkrO1bztO3Zk5o7xpTxd2VaQLZfCOllBu5dnWLI8IJsib7LcVV0dK9nf6byYsY5PrYlSCupx6d0uW',
    'AYNuKyjrY4_ptFwMXpQhowCR9V6ns35FC0cElYYZwjshMkQ3wc0iQJQciXkr2KsBJiOi3SO1nBHHu8Xa',
    'AaaXw7i_cFPcN1LHYIPDFjsn4qN2--nQgL413zW5s--ZMK5zXvtlGIvscQjT24axqeTasFjB7qXXcBI5',
    'AaErQSStIgrMS1Wt6vyVh1dI9S38ueIYroiEEfQIG6bAaLn1YSKytF7Th4utpxo9tipKSStXUlobuB5N',
    'AbPSFDwkxJ_Pxau-Ek8nKIMWIanP8jhAdSXX5MbFoCq_VkpAHX7DZEbfTARicVRWOVUgeUt44lu7oHF-',
    'AbXt5XyCzxxMhuZvBVENK_djVGwGcWsDPZHOpem3s8YFDN80wCl-6kq-vf-bt9-k0FLiJIOksYceQpFZ',
    'AcIpUPU8c1i0sDZ-FMYIsJuOEpeP2BTL-hmwcbcYijfZW9_esiJoBGeX0lGE8U-A5YbXCpOWuPMkQCDQ',
    'AeXffmIejvxgasb8c_1t1pxfj8hzaywUILZzr-TPII6nk3KrLkdnqfiQlcNjghmpaHwtBjdRAjcJkGwX',
    'AUXZ4u8N3OPaxj_b-RwgBRr3Efs5mqeRT1qZXWwCeXjQaQpW9GeJnfPZy6ZfUDZh0u_szXrNDjzSM5-Q',
    'Abd-37lTccSNiHam_-H_NZtQa0tmsjxztAbnmvy_7R8kjvuVz8QvETPLfYW5Zf0dfvWHIfmaHIALs6Qf',
    'AfIGckSuPS8-PLFn7rcis59G2tQOaKlqgRuUHPW3_ed_Y6JZdohTjjTpUVfvAxnKC0-zWuOLBWrpMCo2',
    'ARbpxmp0udlm2zBPu6bqW6PAMV-UfCTktgWFtJ0cy1rKQUUtIRffwg1A-i0wRyFg9BhbfZM3M6ci6czP',
    'ARGQ1kBYHQGaz6Y9_0twfc0Ityx3TUCMTucXOni6OmABeu8s9yxaCXOJRibWvKRELFp1KyYRpMJRYxzs',
    'ATHcOc29WISmwi5VvnVKP8LN3LFVaeWIUiX0FfsNgm1u7CIFAxB7FEZv1vJPOBu3UTbvisBO3wWECYAp',
    'AX5cTDOjB4CuFZeR7gWVEzVeI3cM6_j_5BZ99ZjKOtyH2hQl4Ptkun5gdXa27n5p8E_MSc5VTNcicOY8',
    'ARbo7WUH4Uas8uz-UpsOpRos4hAt8h-PQXVI9c9MajzrKTyB3sGwY6L8LcRpuEDq9VGAQGRgbbEU9ReS',
    'AWKM7WCLJ9CfunAKHctvRPmYdhwC9dGyY6EAtkSUGHVV58kxRc9clx3hPf9U0nNkWsFFzRu-Ila5Fr8A',
    'AX5TZNFfJqB2PmFoEKCYtd6vpDzEkanw-TIh70ZZ-h3bFsyvcjlz3BUafZDA8JsYjidNw_TmlGDMwgL-',
    'AQWgSfn9emdJnPEBBwwvB6N4F2AoXbDHKq3rwW4-ieEP3TRlWiApzCWpGdyNjymcxlXIAxuf8sScQWMv',
    'ATrCdcXIyAX6fPCjCD6UBgIJ4sNNm3SNQzJ54cO_X8f-SI9kSAhV_Z999bFb225scgZdB0lmk78-jcwb',
    'Aa_DG3hUsFI6iMf87VUOyRCWH28pC5ijDrFPYnG_fXUT9NccX5D5qm218rUWcXyTj65vu2FBmYxP3Zam',
    'Aderc8flr4FvE21kxRJaxvFyURKeUi4znzTj71EbyHNiFDm7uhagNFq3ctfig5ZAcj6vobt7C4y060d7',
    'AdtXhR3loNJ7B0hpup-jhP5Tt23VwLdtfHDbqW2vcJ6bIwrsvKajuMvTP7a48PFRzNsWJgqL4Ai14vNb',
    'AeueZ5XoPc4cPG9v2kwlk4dIeK67CE0RyIwTzKSZlYlClcxH9P1xAtpfCpE4UQuVCXxo466IUj8ALNa2',
    'Afc6ldERu0z1EWXp8MYi4QzHudDEAfMjL9UwCW-DYH1RTA0qSkRJWoMsu3kUp1dR4zeRAVNovSU5Gh8n',
    'ARjjpGuuTRVYUQ3h73A2Zl6zOglzYtuWCnPC8yZTp51sA1XlKpuj5pOmQeoYkDrPIAQTQTwteJhAaqd9',
    'ARTz2u_4Z9ZHcbwont1r7U7Y9cXBHMbkhTfOx67ONIMkwqDYr08vv4SIrYP7_wabZuYobR9A1AtS-C0e',
    'AVhCvBBwz7WcCJNWt4ShmzeXcTs-B-ydD1hdqsV1bbT6P4TvhsFxIHKAE-GO',
    'AVX7d1JfuB4fLeUhpG6O5JA6i6iB0sQr9IG-SAyvEN5TIo6N9otHSB4X8aaMcLOQL0R7J4XEJBQzQPIj',
    'AWS6hhBD7yuASYqmEX180QF5ELJGDf9vW4pOwwVg3PxA16entKKfNOxhkMoE',
    'AZKHl5I5X2-oWg30KETaXhj_5-CtJ2NftUT70No3-FD2MDm76KhanS_XM8OrPEA1JYc2RrhNrDYL5rbL',
    'AZsPWotgvxGKy-sWOcTE2xtZbHqJ15jyXWHJDVrODGF0j5ufpB-89ILdNDq8cOFA8o3YnFvC_rlUDKOq',
    'Adk1XwEPQMKOn-b9a0lMZ87uctEXKc7K9ZPHIfm4z8Yr3ZlWYDlAznceFFyzS0RbXfQqONuyFvZa4rto',
    'Af96d--L5ACQRgWAJ21VbDgbLMEW0m7SnlwtzVziKtwhkeaUVSSex-ivaMqCe5yO5ACRBzOTa57RNFfO',
    'ARBQw6GmaZaOMNkUUz78FN0hrNHflsmVAbXsSgQoHlOnXEzBjzqMpp4V9HH2LxVXK0t1cUCQtfijdHQ8',
    'ASdxwSqu8dAfiPTYWGxXF_oB1m2f5-kiEShqzrLSrq1UzI7m718X1Bh7oA6oRRaUgiCIyW8Dcfbxyj-J',
    'ASuksXjiG9-kzC6UT1_WQFSdcokQjFFivpw7MvzJzPLH_o7dxj5pnlCjs_u3Iu7x4xLgqTM5oJB28I_o',
    'AYArObyAM4DSnefp0u4QEGEgPOolT0sT5KVtC-kApU4UOhnotD55PPvts7tbdBNVPYHrJ1mDDzgDrfLt',
    'AZNBW_MBovzo-FQb3NoLC3TqhUOTZgcluCth-oYF4Ur4Hnk16bD0J7o1srJxd8RtRuDI1-Pf8mlAcAOZ',
    'AQtA-m8ydts6vPKeNcR2V9lbnUk1pBIjDA8F7d7pnnE22OdcoVKS6v2mpuicU9ETnPtD7KSgfClOW2ez',
    'ARiex1Obbt8VCzA3oiFddD6IM8GW_rSM-7bEQHYMEbm-Z8PKnZhnJiVZ8R2h6QnOOkRhO6qrPkacUB-6',
    'ARme3lHreiKJ3gYg6HThgcBTRwPTJ8AZEzVORV6N_b92yDHYyf1QNZ1bI7OPdF9Wxnk6iyQ84-5ZVj6b',
    'ASdzkkc3gZD4p6OQENcdTF4-BYbalbTCRZEuruTd1IcGuu3CjOFEAXX4KRtseAVv2_0VJhkegmfK066l',
    'ASgUH7GYLmT5OeoCIiZxCLdf_TkJWuN5xm6XyYm4UoKy2PJ9ph2kNS-jJRHEa11UfrsH90mrHCiFYneD',
    'AUstsy-MMWK_e92mOhtyXamPhDkjragWS2E-1N51CqQEPzLA-TmQW65ROOnE5horq0XmVGAHn3gwC9Px',
    'AUvtyfR1BKhuGWyI6oKu-KCJ_hr1wkh-BZTWIH8N6b6CqLc09mp1u43ZAB5Gv17wP2d2kecRhWdQMNJt',
    'AVZhYm14YbV6P_TNkde0MGGSxEtDncv7eL6xfh4NToEXB_vMMBETx6VjDX794rWvGhERKeb1xEXxD0Ze',
    'AfnCuLnoYiXnUIU-xTedeAUqQ_d_E17FiQVeNxXsDBrgHeUlDO9Di607PQWdRIep2-2wLMNk6w05BS4_',
    'AfVbaF5KGZuZzvs7b37iTEqatdhRly1S_uqGgAZ9H1rJixIm2Z1CNiMli4I-U5tDvF7wFR0ZGtC0sqJL',
    'ARnXPP5gAw_eGAXH1GVKM95kLABSvGRyCny-BkHW6UWSlmFnv5zkLskgEjuNwahxA1pBI2RRGCL1U2E7',
    'ASxq51TP92spfbizUkcxNEl7x84Ct717OJ0xgI3A2O_FeIH1F1jEdTBAKWZq5Ml2G3U0p3g57OQlZJOB',
    'AZf3sGCx2OIfGAMTGmcHDd0tt-VXYCducWtnkOnlOOUaA9gtWni3RbxZJ9U5LpJ-jsQ5YG3xX5nudMjG',
    'AddUoLv5JTnaAb5F2sxspDib4pni6Npi2ahl5NB0jXZMTqODYwujzQc4dGwywjbql5XBZN_-vFQNgN3X',
    'AfMTdM4POMezgiXfKDh3HCjxr5ztnb1N8AC60fHc23GdDCFq6DuIFhgwKG4W2-PsH9Lm3DqcuBGSIO52',
    'AT9nuYQxHQVOx-HSovm8DAAi3IWig_NlDrHibluNefWCzToCfar4G7DVp79FQLhVqqrdh9Ekk3KDcZoT',
    'AUzzFVKF6GZQDgNZH8JEUizm9sMhd-57lsAXyU6u4aFuTxU33OiutNq58_s1io0kd7epP5W6ASgcF-nF',
    'AVAqdF32y5UFhSWdjs7l67vcOuoQNk1KKXL5v49h14CZpW4QN7pJQDQyEXRbUBO4yylXXya9nu1LRn9Q',
    'AYOzl27R846B-NlpnYdfBveJ78MS5-CqTCS-kS4t2cTUwRUDkb4XsAyTLbwla1FWNdN7815pLLQOl5VJ',
    'AaLE7VZ5LC8sxudigS7Ekjfezc0MfHyzVW0n3AhZAJdfnim546ZwwY4iqK980R1ghPwh0lPoLyKddhS_',
    'AdtSQhJ6ffDtKJUwFl_ibaLaZliNOn-7E10cAVWC0MCEE2b9ptVe3bqj_M2hSLA6DTN5hPPqowKEGHxJ',
    'AQUSF3r4WLcs0AtHj1KxHdEEtJzQ3UdDmQ3MabfGLYcB4Chi8vgXJDL6dhxwQgtslpbgXX2A3RDMHV_z',
    'ASBI4ZfWKMssNADQJn-i3HMjph-s_sh7TlRQ8QJSz5TuoKhYGQRtsjXAN8bpantK0Eyd8SF7zniRcMPo',
    'ASIXJkiQIe-qp3P9iuC36a0xdjm57cP6nYnT3fgTxU8zALI2fLW9KwU6ZoP1oE9E7bzmG_dZOEZmEMja',
    'AVb8SEdeAJbnLi-QmoaBiapiRr7FbrGZksICDQgrDtCdQfSvXtmuFH0VqlzdS4sRj6R2qmNhrjJj7IzA',
    'AXvrPG7sDG6Zvt2o3ZnaXRK4m6Nie-KPDrChxf2_a30zFFs6eJwQ-BJgFrATt-IE9kvR5jjj757NgKSC',
    'AafaqFH6ta0PFlvqt02vd08h_gApCvhSt07by8A1rBga83TyFty8iVRVv-BiOEWO-8AtwyOQaNBiLMES',
    'AaqFeKtndmKfGYPQxXkV1ZErQylYG0OJ3MapCrQBfBojhG9heTdKKXXLMoMj7SW3ImZhNWVQ82zp2QCF',
    'AcecQRTPYDrLRKbub07lSrii9oCxy_gRf4AN3DBYP1qXkT7vNq_ljT_tw2FQDTtcIfOc85h4wKtfwOzn',
    'AcqlbM3LatHfLUfAqshlfyg33bmVs76nZl8cMQBbstVqyF2fDaiEz7qhcFZSMhA3pepiZpIiYXjW0d_F',
    'AcvRLo7nXCDN0fkkFDP0iocM2bSQ2ZALUxfUllf-fG55OeQjgOjkDnmjunrwZiiOsfzbSNlRQnqC8VK0',
    'Af5KN34nRKGpeuf-NXHG-VApLYlIxYO8Oaiid4CZVv6LIu7n4u-SWt04ChxQNn6jDZNH76kNRLXspEwS',
    'AQTB_zZaQzo1yd1NYCgFFox9wV7_V_BNfW2gDhcvRWpEMypkh5RCDU8z82wwkgni0d09XYJPIO6BM_GQ',
    'ARbuhqx-MQmTt3P2BBa3CEPakK2GupfPZuqAahytrA20seYZqlQ_bM4QHssuXkWkH0xCt0grj4QmJ6zC',
    'ATKIVzgAqAehDQPdPR1DAQsj-_PldhwMrxXCJCicmvthg2f4lm0df0nALpg4dEZT57QO21fLmfpln0Wj',
    'AVnVnDe3ACy2bgUFhKHBPbp_-fQwoe5qrgfcURR-UI3iOshoaGvNwUqxkx4SU6QR6eUt8fRCxR0U2ylp',
    'AVwOriXt7qS3KYOGRhP3JAOLbSM43pfk61ZVORvZTyhmQ-mvRW-zXWMS2AWUokQ14s1UQ29jpfiIumJU',
    'AX09zAGVFtWwrm5_JZUFfh_VKOcx953llczSMPGYsPFbFzk1QoCgeRHVnwXhR0AN718VDiJJnos2-dKm',
    'AXadcB5XetUTL34QyQlIiRK_UtDm4cn9_ShNmMw8FhBIh6rZQxtiQ9K8oqHsk9PQXkLQtaOzgkahWRi4',
    'AYRs82wfBGrz_kctFWYHBCnZd4Eof_ZLNzAeb-m7M0s4OHaD-go6vm7rpmH_hLOdMYc3DiJ80v5TPSgJ',
    'AacYo2k113JWY4e066cKchwdJLmyIcnYyowIloKB6o7DHdldIhH6N-pqDr7EMshGQyHrulbVbmAYmgJc',
    'AbJfQBbMXrRGZZSGyEqvHdRxtpr5bc5GHojFP2WWcObXlYU5zQunRwQUJ63PFMfXIv7stZDQFH1-yfJp',
    'AcCj4SalkPbqb47qQc5yJ1weNTvmbiea0lzR-3EDvXDZIyMsHcIpdB5BElpyrf_lAqDKOQSynZradhxY',
    'Ae6Vx3mw2UPZEf7QczT7tg0uUxLauuKtka_myxmlu6ShkZrdj4NBGHAvDYdaMYPXLnSxzfXmaeGkVN54',
    'AQPe41YXAOtjyC5dSdPbIt0gxNU8ptIDxJyb09A1BDIEeVovW_rZs-m2TehzWYAlnv_kmWgTn5VBslpL',
    'ASOCm7KsBwt5LUae_eeq6k1lv-ac0rcrSh3Gwk0dfEZ0_Sha3FdEDFXq0zAjXVLVBGUJGAS4KJIba165',
    'ASVO3qMzYivRm-QVp0B4jkB4DiiFp7kAG7s8FFYrp4KS3NNl1WQlezd_XsEE_4dXaftMYdF4KMdvh7WT',
    'ATCn6Ird1RIzRDVOLbUmGI5AUavRrK0XnnOmYhdghgFdhKMkZ6Zvr4C73_UH5xp5F1jCcBX9a4fiHbDf',
    'ATSJJDJxr9LpuVNkxYbXGvteFXCDD1tmPMDfKJ5sefBSIguK4c6dn4WfK6oCYnvbj1sVQNtuXVDaWDi9',
    'AUrnJiuXzmouRq2NZCcXZoDQYpP-gO4HwNiwgu7QCmlmWgx3bAY1qEI8ou343m943Ylbfmwn_5Ttye4D',
    'AUwcswMqaswx06CvK70TO4WUtE2Ar4DRXm-_WypzdIlVNUXotXB5fhQtlc-MftdF0GOwkDCbDHQsWl9D',
    'AXDJmCbAxM8PXTV5EFph8mlO6TzPnbcmQ5gNeWvCL6gbaX2qKKmXqfDC6EEppPSHq7wDSip6UvbT9eZA',
    'AXGOUolOr-cZ-NRP1lo5q9oolK2j4JBSAQeqYCvnuRPN-LKHIUemaEGtyXWbrMsSt6Ur-ixbO6oRZN3C',
    'AYD7u5dAmXH8EcBmhuWEs15anelQVxDZNhjYT2WnaZWksgB8vsnbCSmMVnyYo06IUUD9xF6LKJriPew7',
    'Aa5GsKmJC0UkW4un8T_6lvdXsb1fUgkfVi84AesLRWAmO_3MA7503teyZ_Uzf6xUixuyUuTkpfS5LftD',
    'AciW0Q7w0Ok2Ri_dvGTwJKsRcb5dAOHFJZfHf_kMC_PnP_7KnLj-OdwRPLxD7M25CRvXgp5nNJA3C2jH',
    'AcjM7hAZjUAqIgU0Lvzneb9-_rWs7qAEl6PoPVHtQV5PNmWBihQWsu_SglKO',
    'ART7rYn1IyUVDyGzxwiQSruiFD5OvkD6lkfpv3aX8UdMdmtVQWIUfkiAe_wwRepxtpJzWebA1dQYQpxE',
    'AS-9YzIwIgM7pFVJwG83_0cmtz-p6ErqV0diV8BDctjfX4mj-UUVi8hRwfb5pTuRi7GobwyUExMP5IYt',
    'AS3XJS9qJqzSoJ80MhsYv0FYMI-Tt2HtAJawgorL9yKBpjeRMaao5YtctUMlTH2i9pZ3x0gJbP9ybBEy',
    'ASG2hdCw4rCGvBmIjUIrZpBkDuBnuiaEryLrd8KBROyg-7FGdgcFeQ4eOVRxwIJCDZT-h2v8oqAeStxV',
    'AU8l__XI_fM9mqndO3EV43pfH2NvPawYNdotjsAqksFa2EnXfn3Q3ngwAIi5-Dx03TKAyliifkTfKYTU',
    'AUe6fpHCdjTKK_sxP7apE-6Qot1BV6xnDGg2iPQXJzMpbrQzbWebryYPkF5eBRxUYWRGwaEc3q3GpLbS',
    'AWCNxJ1zPs-NqO0AS6tBiGbIbHfy12-uVfhmtibM51Jv2qXJx08RqfBfWQ9oJkUaXON16zXFUfpXEgFz',
    'AWTCyz8bsjCppOZ4znVuzCXiq0pvGZeNWhlL-izK02ArHOlBoLVq97AtNDLhA3jQWcpuNRcab7dEB7lo',
    'AXZQrZVm8c3MGvovD4cNKiwBjIMMKAlhbP-wWcj67N39xDe-2ZdEdAPO7nV1bAcLM4v8iNUp0N_Mcphk',
    'AYmAf1wW0BWJMwUM_3lygY2_9wJeNok7DcguZ5VQZSWrk2DdnyMqBKKH_sh8T_DYJ10Jv1FTIzcBoRmV',
    'AZ10uBSCpZr5Stazc2Qp4kamQ7e5j1uvYugUfyqjn3_E0mPiQn7IZbfJ_5PHVQoNRwokZMCSSxEVk5gv',
    'AZbL__Y_-mRd5WEZYRHkxpw4PDaVGapobKAwboA1syWwSr9VdPTHos6FEWaGJvajHiJG72ZyVzNeslIO',
    'Aajr1vTTrL58YvDThPIsdrNP4jl_d2KahfheyZFUb6bs8Kbx3WoZCn0b5u_TnLHcOiymePb7OcYbIRvn',
    'Ab3Kury5vH4Nd2yDJ44vRvmuJhrCSj00bXcZ1L2MVrJ1XMjhQFDIgSFADUdytto901kBDIB_q-9kICcA',
    'AbB_czT7AhCglLGQDWtB6BNcW2IIhmhHaHGH89qJWNNjJHzYxIk6z5cQN3Os8nknVBXw2bdNB_m6wSxs',
    'AeJImnS4UyTQcDktg0Nr5RDUHEj5paDkjR35_FpWY2BANcQWwcUDTMTdcHz_6MCETc5EqLHSglfTrXha',
    'Af-FvbZhoCMcq70C9YwduBsM2FkmNlLnwIz4O9o_4NhQdxYwlKiRa4kUgXBJafXUdfija4n-wmmISFkW',
    'AfMBvZqDv9OoaMe8pn35-xOwufIhaHRkr-FgC64gh_ZanWKd3z3t__siBDz94SYWVAXfh1x5Nv03AfzZ',
    'AQXnKIXPG9SXvMmfD9G7yFtN3dCJjSKE8BfKaafZlzgPxGYkpb0yZhxvUbh5EYk86C7KXxPURskN12OL',
    'ARMyhNwHKlGvZneOKlDPtzTtMKg785buN1F8ABciuHl7HfSFYxz75e4bHhjQBzZgG7_5vjzNEGl6zMG5',
    'ASZNICUjJUEjOf5gXhSp9d99nd8OWF1qabSswy0xD9vOTUxeqtfdlDK102NWoG3OfgZE7DAQt97q2OKN',
    'AT-6KyRrMjWr8Ffr8yR10WOCVVxiMpM8Z2KL2J1YGkCKHdDCFu7c7dVtsajXH_hEu1gd0Qb_am8-crjF',
    'ATZjgdCbWKKq4wIsbgt_KUuWcBzRNTuoTz_JVKiXFNVkxBCNC-CYqvH4aNr7D-7uubhUtqiVsA_Etz0X',
    'AW3Xj48NN_K6zsH8JpAnNXlora23DOI1DhWiLFTWI3tVH6BN0PZD298BW2aizd-Z3CLISV53NynfoWkJ',
    'AWeM9QIuoOntrqxWoZuJHErA4790NA3MpoG5MxSFvsM9U-fVys3H_KzwLnJfL7P5jkdrVThaudOylTaU',
    'AWVZGksyYh40TiLsK3w_ertVJEbOJOdpyfjProgzy9-lbdtXQyHCh_G8-9iKG2DfHobdEtBPZKagnISS',
    'AXpt3KjQyq_WAuuHhBOJNbgz1-hJ6ViIWsujd0uQ-50tYJDB2YkcCDOP8AzsdfPZOLWWBV67TR-ZD9wO',
    'AYFD2Z4N3HgIqrNq78qpZRqL7JLBqaxCYQYoPqEiQC74gKn8KKFnYZ9fdzwLSC7oIGoGfVa-0KGiKKpp',
    'AZGnlh3ha2__TizDxGMvhmxqxXAsft0QoIFjU54D_pHJyABwEF3PR69Ol2hlGQwDZZTb9TdZ33FXi9kb',
    'AZy8eT5YydIKi92O9Y5V0RPuNM_uBIdAq_Keg_rIO7vlsNF9twjOqv2sQVoUnpiJ6qyb10l6SSeNoL1z',
    'AaoAGjTmC0H9GdbzY_qY7-LHEpXMNeO4m4gaxnGBd_2MnRCmH7u9PwYNrvUc_MPkng9MnZjoeRfuGPhe',
    'Aat6dgzz-AhMNM-t6f9ZLMr57DgxiehUDOsBWetFn6oSESrYdd72Q2b-SKzea3x4aHwEnbB6IpNmvhXb',
    'Aaz-u5JdoYyYd2scU6ITuhwKJXfBDcyAS5TWhmC5Pbs0kmvef07CfLC-arEIYXLivOI2G4zexNkz2fEc',
    'AbIdboZdEpyrKU4XclA-dkyGt0PlgaS1-Ffvr3xXvHbYSsYL1sGtus2vv_IYEIKfB5VeFW7s5TccmCqX',
    'AbN-0XBdWV1G0FEnQqVyXUklEHjiMDUIYkyk6FLO6csgUjXHtP9neRBnFaPTYM19NiTkxZxzOa-lwqYS',
    'AciGZEIKay92OieK_taeAIxk4gmkvZYD4V-5V_inGr5N8o4nsissrMfNKp5KF3BOWDDXE6uNmlm8poNM',
    'AdJvUhBNhkJ6wulv88yXQrzbU4ZiMocyZbTsv-9HW0ZDNIZc9YXP-IwNvl7_',
    'AdSP52hoO2-Uq_mBCuOBGgzOzerKx_NBWqcay8Iye3F7DZqSo2xTMsS_hc-sBxBq9ZeZnDJqEtAqU6Mo',
    'AeibaoRpUM9JPbRGAuyNa04EZWfVHI-0EuLLNMJfpU4oA8GduQ8y20G_B1LEI_6IvASe3sCqJGxEY6Jd',
    'AekF1vsyH-KcE0Dit28DhGv6o9KYpcTpGUrC1xmHuUG7x_HimZMMTpH3Hkiam0OXMznjo28JwwBvc2bv',
    'AeWuuHIpOmF5j55eDYdCoW9-rOgh9qGvlcy0aQpxXq27n3a55TL0j2XnWVDCquBjr14x4Fioqp4se4Pc',
    'Af7UiccMdL4x5RZZ0jGTYcaUnsgJS2ghv-iUYbUlXIn0Rxi1Hom2F-Clelfj9yoGczFxUoWcjX81vZew',
    'AfCxhs8W3WGn7Rv0S92CVPHXi7TWSCnRZ1U__AQhOHuw52NjJYFSGTodM5JFjZnVo01eJj8WuDAmM-qC',
    'AQozhXI5S4IvGDPmDJrJKcZi4c8gNDw7Gtn_cdXn78ejc4luxXJ0zCwEjWbjRuY62nfKWhc87LukhvAv',
    'ARbZ7RQg4eBkkdQZBwVIKQxFVCuIeOrv0sRZbMKRxNZVkx_sMbklmaAAbBnwWJy9LQs5xbgh7YfAsH18',
    'ARq9LAELs6Rd9zwF_cp6hoBHrxMA8OsBwvBYCsdifrZq-LU9P9VwPpUby7yqZIgfsrWHoJhWIuK9IPFp',
    'ASqTSIOiYASN3KYHsxmk6uO4O_cmAjk-Shl-Wx1ixHAFGjrDnv6_P_eMCshr9LdwNL5g95ly1cHqVy4z',
    'ASwoeikdyflPIKFAC3U34ewfFVRE5-_p6qc1TTQG9g_sHNs3RP5Sq3pE_e7V2p0VTi-nJQuIA5ApP1XH',
    'AUA_R6qBmczCAhGF-AGP0WbqxunumqEc6FZ8eaD1fbt2jjVmZaiu2QNeKEyC6uXx_PnbXaCOGyMocjuI',
    'AazPaZlGBPP6zyXwC7NgdRNNrfEgD0fNxGpohhfADfPDqHxDjRuO1vwqjEE4aKJrPJ9DaKkfuCD15IWE',
    'AQyNR1vnQtxPvo1wU7wS9OXY7svT_5KlFcgqkBgmEjPgy3vaZBjgReQCV0RD3n4iBh613SJeUqEC37XO',
    'AWum_K9KRwhlt4CGpNTHt5J-jhq4gXQdJ8jAdB3DdhsCc8SlKabUbl26C4UHsg--vKrMiCOxBb4ZixuF',
    'AYLmn4GCg4s8ZKrrU_5fzzwz72vDDJby44c9KbE9QYx1l4zrnFTncWPDx2AGsS65Bqo29D8rCdSBNqt9',
    'AROO3lVGvW116zkoEZ6KRQMg7iAhZ5ZeQ0jyxIYSJHHKflx04MCOdt-wPgJqRONhfHazb3cPYv244uf8',
    'ASncnAA2XqvFN3lpms6oapYFg_dh2cne5MzD5VCk3R_aL9zQIGdi6Nkjzfc0CDZy8q1BeqOWBqnaNFsA',
    'AQedjY9kGMi1lhC2AEl8qbYn_rTY9iS1Z99ijIH-T3RIBzkHcJ1_OEwFJkRjL1j-K3Yt9ezPuEvyjIBK'
];

export const SANDBOX_ORDER_VALIDATION_WHITELIST = [
    'AcFUr3vhIePYLOXXuZzdvFL5th99W0Uygya9lqfjN3XCx-W2dGlr6A9mqiIZAHAMng1g0_haL2LitLAl',
    'ASmWKJfGIEy4BmvwWA3PpAX-uOdz0EYCQ89Y-oLww8LgaqqHtXEcB4dfxr88kmcp3no-efNznSFDcVjg'
];


export const FIREBASE_SCRIPTS = {
    APP:      'https://www.paypalobjects.com/checkout/js/lib/firebase-app.js',
    AUTH:     'https://www.paypalobjects.com/checkout/js/lib/firebase-auth.js',
    DATABASE: 'https://www.paypalobjects.com/checkout/js/lib/firebase-database.js'
};

export const ENABLE_PAYMENT_API = false;
