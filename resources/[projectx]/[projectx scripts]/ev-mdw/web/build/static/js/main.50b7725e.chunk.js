(this.webpackJsonpweb = this.webpackJsonpweb || []).push([
  [0],
  {
    125: function (d, q, U) {},
    197: function (d, q, U) {},
    734: function (K0, K1, K2) {
      'use strict';
      K2.r(K1);
      var K4 = K2(1),
        K5 = K2.n(K4),
        K6 = K2(35),
        K7 = K2.n(K6),
        K8 = (K2(197), K2(25)),
        K9 = K2(20),
        KK = K2(3),
        KP = (K2(125), K2(308)),
        Kd = K2(818),
        Kq = function () {
          return !window.invokeNative;
        },
        KU = function () {},
        KQ = function (dd, dq) {
          var dQ = Object(K4.useRef)(KU);
          Object(K4.useEffect)(
            function () {
              dQ.current = dq;
            },
            [dq],
          );
          Object(K4.useEffect)(
            function () {
              var dX = function (dI) {
                var dS = dI.data,
                  dg = dS.action,
                  dj = dS.data;
                dQ.current && dg === dd && dQ.current(dj);
              };
              return (
                window.addEventListener('message', dX),
                function () {
                  return window.removeEventListener('message', dX);
                }
              );
            },
            [dd],
          );
        },
        Kh = K2(139),
        KX = K2(42),
        KI = K2.n(KX);
      function KS(dd, dq) {
        return Kg.apply(this, arguments);
      }
      function Kg() {
        return (Kg = Object(Kh.a)(
          KI.a.mark(function dU(dQ, dh) {
            var dI, dS, dg, dj;
            return KI.a.wrap(function (dr) {
              for (;;) {
                switch ((dr.prev = dr.next)) {
                  case 0:
                    return (
                      (dI = {
                        method: 'post',
                        headers: {
                          'Content-Type': 'application/json; charset=UTF-8',
                        },
                        body: JSON.stringify(dh),
                      }),
                      (dS = window.GetParentResourceName ? window.GetParentResourceName() : 'nui-frame-app'),
                      (dr.next = 4),
                      fetch('https://'.concat(dS, '/').concat(dQ), dI)
                    );
                  case 4:
                    return (dg = dr.sent), (dr.next = 7), dg.json();
                  case 7:
                    return (dj = dr.sent), dr.abrupt('return', dj);
                  case 9:
                  case 'end':
                    return dr.stop();
                }
              }
            }, dU);
          }),
        )).apply(this, arguments);
      }
      var Kj = ['Escape'],
        Kr = function (dd) {
          var dq = Object(K4.useRef)(KU);
          Object(K4.useEffect)(
            function () {
              dq.current = dd;
            },
            [dd],
          );
          Object(K4.useEffect)(function () {
            var dQ = function (dh) {
              Kj.includes(dh.code) && (dq.current(false), KS('hideFrame'));
            };
            return (
              window.addEventListener('keydown', dQ),
              function () {
                return window.removeEventListener('keydown', dQ);
              }
            );
          }, []);
        },
        Kk = K2(812),
        KB = K2(806),
        KE = K2(821),
        KT = K2(815),
        KZ = K2(799),
        Kx = K2(816),
        KA = K2(817),
        Km = K2(800),
        Ki = K2(34),
        Kf = K2(48),
        Kb = K2(5),
        KM = Object(Kb.b)({
          key: 'mdwPublicState',
          default: false,
        }),
        Kv = Object(Kb.b)({
          key: 'loadingModalState',
          default: false,
        }),
        Kw = Object(Kb.b)({
          key: 'assignLicenseModalState',
          default: false,
        }),
        Ku = Object(Kb.b)({
          key: 'createWarrantModalState',
          default: false,
        }),
        Ka =
          (Object(Kb.b)({
            key: 'extendWarrantModalState',
            default: false,
          }),
          Object(Kb.b)({
            key: 'hireOfficerModalState',
            default: false,
          })),
        Ko = Object(Kb.b)({
          key: 'licenseDataState',
          default: {},
        }),
        KH = Object(Kb.b)({
          key: 'profileIdState',
          default: '',
        }),
        KG = Object(Kb.b)({
          key: 'licenseTypeState',
          default: '',
        }),
        Ky = Object(Kb.b)({
          key: 'propertyDataState',
          default: [],
        }),
        Kp = Object(Kb.b)({
          key: 'filteredPropertyDataState',
          default: [],
        }),
        KV = Object(Kb.b)({
          key: 'businessDataState',
          default: [],
        }),
        Kn = Object(Kb.b)({
          key: 'filteredBusinessDataState',
          default: [],
        }),
        KF = Object(Kb.b)({
          key: 'employeeDataState',
          default: [],
        }),
        Kc = Object(Kb.b)({
          key: 'employeeCountState',
          default: 0,
        }),
        KJ = Object(Kb.b)({
          key: 'evidenceSearchDataState',
          default: [],
        }),
        Kl = Object(Kb.b)({
          key: 'filteredEvidenceSearchDataState',
          default: [],
        }),
        KY = Object(Kb.b)({
          key: 'chargesDataState',
          default: [],
        }),
        KD = Object(Kb.b)({
          key: 'warrantsDataState',
          default: [],
        }),
        KL = Object(Kb.b)({
          key: 'filteredWarrantsDataState',
          default: [],
        }),
        KR = Object(Kb.b)({
          key: 'staffDataState',
          default: [],
        }),
        Ks = Object(Kb.b)({
          key: 'filteredStaffDataState',
          default: [],
        }),
        Kt = Object(Kb.b)({
          key: 'mdwFirstNameState',
          default: '',
        }),
        KO = Object(Kb.b)({
          key: 'mdwLastNameState',
          default: '',
        }),
        KC = Object(Kb.b)({
          key: 'mdwRankState',
          default: '',
        }),
        Kz = Object(Kb.b)({
          key: 'mdwRankLabelState',
          default: '',
        }),
        KN = Object(Kb.b)({
          key: 'mdwCallsignState',
          default: '',
        }),
        KW = Object(Kb.b)({
          key: 'incidentsSearchDataState',
          default: [],
        }),
        P0 = Object(Kb.b)({
          key: 'filteredIncidentsSearchDataState',
          default: [],
        }),
        P1 = Object(Kb.b)({
          key: 'incidentsEmsSearchDataState',
          default: [],
        }),
        P2 = Object(Kb.b)({
          key: 'filteredIncidentsEmsSearchDataState',
          default: [],
        }),
        P3 = Object(Kb.b)({
          key: 'incidentIdState',
          default: 0,
        }),
        P4 = Object(Kb.b)({
          key: 'evidenceState',
          default: [],
        }),
        P5 = Object(Kb.b)({
          key: 'officersInvolvedState',
          default: [],
        }),
        P6 = Object(Kb.b)({
          key: 'emsInvolvedState',
          default: [],
        }),
        P7 = Object(Kb.b)({
          key: 'personsInvolvedState',
          default: [],
        }),
        P8 = Object(Kb.b)({
          key: 'criminalsState',
          default: [],
        }),
        P9 = Object(Kb.b)({
          key: 'curChargesState',
          default: [],
        }),
        PK = Object(Kb.b)({
          key: 'officersState',
          default: [],
        }),
        PP = Object(Kb.b)({
          key: 'filteredOfficersState',
          default: [],
        }),
        Pd = Object(Kb.b)({
          key: 'emsState',
          default: [],
        }),
        Pq = Object(Kb.b)({
          key: 'filteredEmsState',
          default: [],
        }),
        PU = Object(Kb.b)({
          key: 'assignLoadingState',
          default: false,
        }),
        PQ = Object(Kb.b)({
          key: 'assignEvidenceState',
          default: false,
        }),
        Ph = Object(Kb.b)({
          key: 'assignOfficerState',
          default: false,
        }),
        PX = Object(Kb.b)({
          key: 'assignEmsState',
          default: false,
        }),
        PI = Object(Kb.b)({
          key: 'assignPersonState',
          default: false,
        }),
        PS = Object(Kb.b)({
          key: 'addCriminalState',
          default: false,
        }),
        Pg = Object(Kb.b)({
          key: 'addChargeState',
          default: false,
        }),
        Pj = Object(Kb.b)({
          key: 'chargeCIDState',
          default: '',
        }),
        Pr = Object(Kb.b)({
          key: 'curJobState',
          default: '',
        }),
        Pk = K2(819),
        PB = K2(805),
        PE = Object(PB.a)({
          root: {
            top: '0px',
            left: '0px',
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            maxWidth: '100vw',
            minWidth: '100vw',
            maxHeight: '100vh',
            minHeight: '100vh',
            border: '0px',
            margin: '0px',
            outline: '0px',
            padding: '0px',
            overflow: 'hidden',
            '& .MuiInput-root': {
              color: 'white',
              fontSize: '1.3vmin',
            },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
              borderColor: 'darkgray',
            },
            '& .MuiInput-underline:before': {
              borderColor: 'darkgray',
              color: 'darkgray',
            },
            '& .MuiInput-underline:after': {
              borderColor: 'white',
              color: 'darkgray',
            },
            '& .MuiInputLabel-animated': {
              color: 'darkgray',
              fontSize: '1.5vmin',
            },
            '& .MuiInputAdornment-root': { color: 'darkgray' },
            '& label.Mui-focused': { color: 'darkgray' },
          },
          input: {
            '& input[type=number]': { '-moz-appearance': 'textfield' },
            '& input[type=number]::-webkit-outer-spin-button': {
              '-webkit-appearance': 'none',
              margin: 0,
            },
            '& input[type=number]::-webkit-inner-spin-button': {
              '-webkit-appearance': 'none',
              margin: 0,
            },
          },
          checkbox: {
            '&:hover': { backgroundColor: 'transparent !important' },
          },
          mdwOuterContainer: {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            zIndex: 100,
            transition: 'visibility 400ms ease-out 0s',
            visibility: 'visible',
            alignItems: 'center',
            justifyContent: 'center',
          },
          mdwHeader: {
            width: '100%',
            height: '17.5%',
            display: 'flex',
            position: 'relative',
            borderBottom: '2px solid rgb(228, 63, 90)',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwHeaderText: {
            top: '0px',
            right: '0px',
            height: '100%',
            display: 'flex',
            padding: '8px',
            position: 'absolute',
            alignItems: 'flex-end',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          },
          mdwHeaderFlex: { flex: '1 1 0%' },
          mdwOuterBody: {
            width: '100%',
            height: '82.5%',
            display: 'flex',
            position: 'relative',
          },
          mdwInnerBody: {
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            display: 'flex',
            position: 'absolute',
          },
          mdwTabsOuterContainer: {
            width: '10%',
            height: '100%',
          },
          mdwTabsInnerContainer: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(34, 40, 49)',
          },
          mdwTabsFlexContainer: { flrx: '1 1 0%' },
          mdwInnerContainer: {
            width: '98vw',
            height: '96vh',
            display: 'flex',
            opacity: '1',
            position: 'absolute',
            transition: 'top 400ms ease-out 0s',
            flexDirection: 'column',
            backgroundColor: 'rgb(48, 71, 94)',
          },
          mdwInnerContentLeftHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwInnerContentLeftBody: {
            flex: '1 1 0%',
            width: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwInnerContentDivider: { width: '16px' },
          mdwDashboardInnerContentMiddle: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwDashboardInnerContentMiddleHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwInnerContentMiddleHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwInnerContentMiddleBody: {
            flex: '1 1 0%',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwDashboardInnerContentRight: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwDashboardInnerContentRightHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwDashboardInnerContentRightHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwInnerContentRightBody: {
            flex: '1 1 0%',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwProfilesOuterContent: {
            width: '90%',
            height: '100%',
            padding: '8px',
          },
          mdwProfilesInnerContent: {
            width: '100%',
            height: '100%',
            display: 'flex',
          },
          mdwProfilesInnerContentLeft: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwProfilesInnerContentLeftHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwProfilesInnerContentMiddle: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwProfilesInnerContentMiddleHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwProfilesInnerContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwProfilesInnerContentRightHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwProfilesInnerContentRightHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwCreateImage: { marginRight: '8px' },
          mdwProfilesContentWrapperRight: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
          mdwProfilesLicensesContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwProfilesTagsContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwProfilesVehiclesContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwProfilesHousingContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwProfilesHotelsContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwProfilesStorageContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwProfilesEmploymentContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwProfilesPriorsContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwBusinessesOuterContent: {
            width: '90%',
            height: '100%',
            padding: '8px',
          },
          mdwBusinessesInnerContent: {
            width: '100%',
            height: '100%',
            display: 'flex',
          },
          mdwBusinessesInnerContentLeft: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwBusinessesInnerContentLeftHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwBusinessesInnerContentRight: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwBusinessesInnerContentRightHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwChargesOuterContent: {
            width: '90%',
            height: '100%',
            padding: '8px',
          },
          mdwChargesInnerContent: {
            width: '100%',
            height: '100%',
            display: 'flex',
          },
          mdwChargesInnerContentLeft: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwChargesInnerContentLeftHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwChargesInnerContentRight: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwChargesInnerContentRightHeaader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwIncidentsOuterContent: {
            width: '90%',
            height: '100%',
            padding: '8px',
          },
          mdwIncidentsInnerContent: {
            width: '100%',
            height: '100%',
            display: 'flex',
          },
          mdwIncidentsInnerContentLeft: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwIncidentsInnerContentLeftHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwIncidentsInnerContentMiddle: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwIncidentsInnerContentMiddleHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwIncidentsInnerContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwIncidentsInnerContentRightHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwIncidentsInnerContentRightHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwIncidentsContentWrapperRight: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
          mdwIncidentsContentWrapperMiddle: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
          mdwIncidentsTextContentMiddle: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
            paddingBottom: '1.5%',
          },
          mdwIncidentsAddCriminalContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwIncidentsEvidenceContentMiddle: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwIncidentsOfficersInvolvedContentMiddle: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwIncidentsPersonsInvolvedContentMiddle: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwIncidentsTagsContentMiddle: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwIncidentsVehiclesContentMiddle: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwIncidentsCriminalContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwEvidenceOuterContent: {
            width: '90%',
            height: '100%',
            padding: '8px',
          },
          mdwEvidenceInnerContent: {
            width: '100%',
            height: '100%',
            display: 'flex',
          },
          mdwEvidenceInnerContentLeft: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwEvidenceInnerContentLeftHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwEvidenceInnerContentMiddle: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwEvidenceInnerContentMiddleHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwEvidenceInnerContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwEvidenceInnerContentRightHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwEvidenceInnerContentRightHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwEvidenceContentWrapperRight: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
          mdwEvidenceTagsContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwAssignOfficerModalContainer: {
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            display: 'flex',
            zIndex: '1000',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          mdwAssignOfficerModalInnerContainer: {
            width: 'calc(50% - 64px)',
            height: 'auto',
            display: 'flex',
            overflow: 'hidden scroll',
            position: 'relative',
            maxHeight: '80%',
            minHeight: '35%',
            backgroundColor: 'rgb(34, 40, 49)',
          },
          mdwAssignOfficerChipWrapper: {
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwAssignEmsModalContainer: {
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            display: 'flex',
            zIndex: '1000',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          mdwAssignEmsModalInnerContainer: {
            width: 'calc(50% - 64px)',
            height: 'auto',
            display: 'flex',
            overflow: 'hidden scroll',
            position: 'relative',
            maxHeight: '80%',
            minHeight: '35%',
            backgroundColor: 'rgb(34, 40, 49)',
          },
          mdwAssignEmsChipWrapper: {
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwAssignPersonModalContainer: {
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            display: 'flex',
            zIndex: '1000',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          mdwAssignPersonModalInnerContainer: {
            width: 'calc(50% - 64px)',
            height: 'auto',
            display: 'flex',
            overflow: 'hidden scroll',
            position: 'relative',
            maxHeight: '80%',
            minHeight: '35%',
            backgroundColor: 'rgb(34, 40, 49)',
          },
          mdwAssignEvidenceModalContainer: {
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            display: 'flex',
            zIndex: '1000',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          mdwAssignEvidenceModalInnerContainer: {
            width: 'calc(23% - 64px)',
            height: 'auto',
            display: 'flex',
            overflow: 'hidden scroll',
            position: 'relative',
            maxHeight: '80%',
            minHeight: '53%',
            backgroundColor: 'rgb(34, 40, 49)',
          },
          mdwAssignLicenseModalContainer: {
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            display: 'flex',
            zIndex: '1000',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          mdwAssignLicenseModalInnerContainer: {
            width: 'calc(23% - 64px)',
            height: 'auto',
            display: 'flex',
            overflow: 'hidden scroll',
            position: 'relative',
            maxHeight: '80%',
            minHeight: '22%',
            backgroundColor: 'rgb(34, 40, 49)',
          },
          mdwAddCriminalModalContainer: {
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            display: 'flex',
            zIndex: '1000',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          mdwAddCriminalModalInnerContainer: {
            width: 'calc(50% - 64px)',
            height: 'auto',
            display: 'flex',
            overflow: 'hidden scroll',
            position: 'relative',
            maxHeight: '80%',
            minHeight: '35%',
            backgroundColor: 'rgb(34, 40, 49)',
          },
          mdwAddChargeModalContainer: {
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            display: 'flex',
            zIndex: '1000',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          mdwAddChargeModalInnerContainer: {
            width: 'calc(74% - 64px)',
            height: 'auto',
            display: 'flex',
            overflow: 'hidden scroll',
            position: 'relative',
            maxHeight: '74%',
            minHeight: '74%',
            backgroundColor: 'rgb(34, 40, 49)',
          },
          mdwCreateWarrantModalContainer: {
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            display: 'flex',
            zIndex: '1000',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          mdwCreateWarrantModalInnerContainer: {
            width: 'calc(23% - 64px)',
            height: 'auto',
            display: 'flex',
            overflow: 'hidden scroll',
            position: 'relative',
            maxHeight: '80%',
            minHeight: '22%',
            backgroundColor: 'rgb(34, 40, 49)',
          },
          mdwHireOfficerModalContainer: {
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            display: 'flex',
            zIndex: '1000',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          mdwHireOfficerModalInnerContainer: {
            width: 'calc(23% - 64px)',
            height: 'auto',
            display: 'flex',
            overflow: 'hidden scroll',
            position: 'relative',
            maxHeight: '80%',
            minHeight: '22%',
            backgroundColor: 'rgb(34, 40, 49)',
          },
        }),
        PT = Object(PB.a)({
          mdwLoadingModalContainer: {
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            display: 'flex',
            zIndex: '1000',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          mdwLoadingModalInnerContainer: {
            width: 'calc(30% - 64px)',
            height: 'auto',
            display: 'flex',
            padding: '16px',
            overflow: 'hidden scroll',
            position: 'relative',
            maxHeight: '80%',
            minHeight: '25%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgb(34, 40, 49)',
          },
        }),
        PZ = K2(0),
        Px = function (dd) {
          var dU = PT();
          return Object(PZ.jsx)(PZ.Fragment, {
            children: Object(PZ.jsx)('div', {
              className: dU.mdwLoadingModalContainer,
              style: { display: dd.show ? '' : 'none' },
              children: Object(PZ.jsx)('div', {
                className: dU.mdwLoadingModalInnerContainer,
                children: Object(PZ.jsx)('div', {
                  className: 'spinner-wrapper',
                  children: Object(PZ.jsxs)('div', {
                    className: 'lds-spinner',
                    children: [
                      Object(PZ.jsx)('div', {}),
                      Object(PZ.jsx)('div', {}),
                      Object(PZ.jsx)('div', {}),
                      Object(PZ.jsx)('div', {}),
                      Object(PZ.jsx)('div', {}),
                      Object(PZ.jsx)('div', {}),
                      Object(PZ.jsx)('div', {}),
                      Object(PZ.jsx)('div', {}),
                      Object(PZ.jsx)('div', {}),
                      Object(PZ.jsx)('div', {}),
                      Object(PZ.jsx)('div', {}),
                      Object(PZ.jsx)('div', {}),
                    ],
                  }),
                }),
              }),
            }),
          });
        },
        PA = {
          Select: function (dd) {
            return Object(PZ.jsx)(PZ.Fragment, {
              children: Object(PZ.jsx)(Kk.a, {
                fullWidth: true,
                sx: { width: '100%' },
                children: Object(PZ.jsx)(KB.a, {
                  id: 'outlined-select-currency',
                  variant: 'standard',
                  select: true,
                  label: dd.label,
                  value: dd.value,
                  onChange: function (dQ) {
                    return dd.onChange(dQ.target.value);
                  },
                  sx: {
                    '& .MuiInput-root': { color: 'white !important' },
                    '& label.Mui-focused': { color: 'darkgray !important' },
                    '& Mui-focused': { color: 'darkgray !important' },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                      borderColor: 'darkgray !important',
                    },
                    '& .MuiInput-underline:before': {
                      borderColor: 'darkgray !important',
                      color: 'darkgray !important',
                    },
                    '& .MuiInput-underline:after': {
                      borderColor: 'white !important',
                      color: 'darkgray !important',
                    },
                    '& .Mui-focused:after': { color: 'darkgray !important' },
                    '& .MuiInputAdornment-root': {
                      color: 'darkgray !important',
                    },
                  },
                  children:
                    dd.items && dd.items.length > 0
                      ? dd.items.map(function (dQ) {
                          return Object(PZ.jsx)(
                            KT.a,
                            {
                              value: dQ.id,
                              children: dQ.name,
                            },
                            dQ.id,
                          );
                        })
                      : Object(PZ.jsx)(PZ.Fragment, {}),
                }),
              }),
            });
          },
        },
        Pm = Object(PB.a)({
          mdwAssignLicenseModalContainer: {
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            display: 'flex',
            zIndex: '1000',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          mdwAssignLicenseModalInnerContainer: {
            width: 'calc(23% - 64px)',
            height: 'auto',
            display: 'flex',
            overflow: 'hidden scroll',
            position: 'relative',
            maxHeight: '80%',
            minHeight: '22%',
            backgroundColor: 'rgb(34, 40, 49)',
          },
        }),
        Pi = function (dd) {
          var dU = Pm(),
            dQ = Object(Kb.c)(KG),
            dh = Object(KK.a)(dQ, 2),
            dX = dh[0],
            dI = dh[1];
          return Object(PZ.jsx)(PZ.Fragment, {
            children: Object(PZ.jsx)('div', {
              className: dU.mdwAssignLicenseModalContainer,
              style: { display: dd.show ? '' : 'none' },
              children: Object(PZ.jsx)('div', {
                className: dU.mdwAssignLicenseModalInnerContainer,
                children: Object(PZ.jsxs)('div', {
                  className: 'mdw-details',
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'space-between',
                    position: 'relative',
                    justifyContent: 'space-between',
                    flex: '1 1',
                    overflow: 'hidden',
                  },
                  children: [
                    Object(PZ.jsxs)('div', {
                      className: 'mdw-desc',
                      children: [
                        Object(PZ.jsx)('div', {
                          className: 'flex-row',
                          style: {
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            padding: '15px',
                          },
                          children: Object(PZ.jsx)(Pk.a, {
                            style: {
                              color: '#fff',
                              wordBreak: 'break-word',
                            },
                            variant: 'body1',
                            gutterBottom: true,
                            children: 'Assign License',
                          }),
                        }),
                        Object(PZ.jsx)('div', {
                          className: 'flex-row',
                          style: {
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '8px',
                            paddingBottom: '0px',
                          },
                          children: Object(PZ.jsx)('div', {
                            className: 'input-wrapper',
                            style: {
                              width: '96%',
                              marginBottom: '5%',
                            },
                            children: Object(PZ.jsx)(PA.Select, {
                              label: 'Licenses',
                              value: dX,
                              onChange: function (dS) {
                                dI(dS);
                              },
                              items: [
                                {
                                  id: 'Driver',
                                  name: 'Driver License',
                                },
                                {
                                  id: 'Weapon',
                                  name: 'Weapon License',
                                },
                                {
                                  id: 'WeaponClass2',
                                  name: 'Weapon Class 2 License',
                                },
                                {
                                  id: 'Fishing',
                                  name: 'Fishing License',
                                },
                                {
                                  id: 'Hunting',
                                  name: 'Hunting License',
                                },
                                {
                                  id: 'Pilot',
                                  name: 'Pilot License',
                                },
                                {
                                  id: 'Business',
                                  name: 'Business License',
                                },
                                {
                                  id: 'Bar',
                                  name: 'Bar License',
                                },
                              ],
                            }),
                          }),
                        }),
                        Object(PZ.jsx)('div', {
                          className: 'flex-row',
                          style: {
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            paddingLeft: '15px',
                          },
                          children: Object(PZ.jsx)('div', {
                            children: Object(PZ.jsx)(Kx.a, {
                              onClick: dd.confirm,
                              size: 'small',
                              color: 'success',
                              variant: 'contained',
                              children: 'Save',
                            }),
                          }),
                        }),
                      ],
                    }),
                    Object(PZ.jsx)('div', {
                      className: 'mdw-alignbottom',
                      style: {
                        display: 'flex',
                        justifyContent: 'flex-end',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '8px',
                        marginTop: '1%',
                      },
                      children: Object(PZ.jsx)('div', {
                        children: Object(PZ.jsx)(Kx.a, {
                          onClick: dd.close,
                          size: 'small',
                          color: 'warning',
                          variant: 'contained',
                          children: 'Close',
                        }),
                      }),
                    }),
                  ],
                }),
              }),
            }),
          });
        },
        Pf = K2(813),
        Pb = K2(309),
        PM = K2(798),
        Pv = Object(PB.a)({
          mdwDashboardOuterContent: {
            width: '90%',
            height: '100%',
            padding: '8px',
          },
          mdwDashboardInnerContent: {
            width: '100%',
            height: '100%',
            display: 'flex',
          },
          mdwDashboardInnerContentLeft: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwDashboardInnerContentLeftHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwInnerContainer: {
            width: '98vw',
            height: '96vh',
            display: 'flex',
            opacity: '1',
            position: 'absolute',
            transition: 'top 400ms ease-out 0s',
            flexDirection: 'column',
            backgroundColor: 'rgb(48, 71, 94)',
          },
          mdwInnerContentLeftHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwInnerContentLeftBody: {
            flex: '1 1 0%',
            width: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwInnerContentDivider: { width: '16px' },
          mdwDashboardInnerContentMiddle: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwDashboardInnerContentMiddleHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwDashboardInnerContentMiddleHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwDashboardInnerContentMiddleBody: {
            flex: '1 1 0%',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwDashboardInnerContentRight: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwDashboardInnerContentRightHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwDashboardInnerContentRightHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwDasboardInnerContentRightBody: {
            flex: '1 1 0%',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
        }),
        Pw = K2(53),
        Pu = K2.n(Pw),
        Pa = function () {
          var dq = Pv(),
            dU = Object(Kb.c)(KD),
            dQ = Object(KK.a)(dU, 2),
            dh = dQ[0],
            dX = dQ[1],
            dI = Object(Kb.c)(KL),
            dS = Object(KK.a)(dI, 2),
            dg = dS[0],
            dj = dS[1],
            dr = Object(K4.useState)(''),
            dk = Object(KK.a)(dr, 2),
            dB = dk[0],
            dE = dk[1],
            dT = K5.a.useState(null),
            dZ = Object(KK.a)(dT, 2),
            dx = dZ[0],
            dA = dZ[1],
            dm = Boolean(dx),
            di = Object(Kb.c)(Ku),
            df = Object(KK.a)(di, 2),
            db = (df[0], df[1]),
            dM = Object(Kb.c)(Kv),
            dv = Object(KK.a)(dM, 2),
            dw = (dv[0], dv[1]);
          Object(K4.useEffect)(function () {
            Kq() ||
              KS('ev-mdw:fetchWarrants', {}).then(function (da) {
                dX(da.data), dj(da.data);
              });
          }, []);
          var du = function () {
            dA(null);
            dE('');
            db(true);
          };
          return Object(PZ.jsx)(PZ.Fragment, {
            children: Object(PZ.jsx)('div', {
              className: dq.mdwDashboardOuterContent,
              children: Object(PZ.jsxs)('div', {
                className: dq.mdwDashboardInnerContent,
                children: [
                  Object(PZ.jsxs)('div', {
                    className: dq.mdwDashboardInnerContentLeft,
                    children: [
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwDashboardInnerContentLeftHeader,
                        children: [
                          Object(PZ.jsx)('div', {
                            className: 'mdw-dashboard-inner-content-left-header-text-left',
                            children: Object(PZ.jsx)(Pk.a, {
                              style: {
                                color: '#fff',
                                wordBreak: 'break-word',
                              },
                              variant: 'h6',
                              gutterBottom: true,
                              children: 'Warrants',
                            }),
                          }),
                          Object(PZ.jsxs)('div', {
                            className: dq.mdwInnerContentLeftHeaderTextRight,
                            children: [
                              Object(PZ.jsx)('div', {
                                style: {
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                },
                                children: Object(PZ.jsx)(Pf.a, {
                                  title: 'Create Warrant',
                                  placement: 'top',
                                  sx: {
                                    backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                  },
                                  arrow: true,
                                  children: Object(PZ.jsx)('i', {
                                    onClick: du,
                                    className: 'fas fa-plus fa-w-14',
                                    style: { color: '#fff' },
                                  }),
                                }),
                              }),
                              Object(PZ.jsx)('div', {
                                className: 'input-wrapper',
                                children: Object(PZ.jsx)(Kk.a, {
                                  fullWidth: true,
                                  sx: { width: '100%' },
                                  children: Object(PZ.jsx)(KB.a, {
                                    sx: {
                                      '& .MuiInput-root': {
                                        color: 'white !important',
                                      },
                                      '& label.Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderColor: 'darkgray !important' },
                                      '& .MuiInput-underline:before': {
                                        borderColor: 'darkgray !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:after': {
                                        borderColor: 'white !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .Mui-focused:after': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInputAdornment-root': {
                                        color: 'darkgray !important',
                                      },
                                    },
                                    id: 'input-with-icon-textfield',
                                    label: 'Search',
                                    variant: 'standard',
                                    onChange: function (da) {
                                      return (function (dG) {
                                        if ('' !== dG) {
                                          var dp = dh.filter(function (dV) {
                                            return (
                                              dV.id.toString().toLowerCase().startsWith(dG.toLowerCase()) ||
                                              dV.name.toString().toLowerCase().startsWith(dG.toString().toLowerCase()) ||
                                              dV.incident.toString().toLowerCase().startsWith(dG.toString().toLowerCase())
                                            );
                                          });
                                          dj(dp);
                                        } else {
                                          dj(dh);
                                        }
                                      })(da.target.value);
                                    },
                                    InputProps: {
                                      startAdornment: Object(PZ.jsx)(KE.a, {
                                        position: 'start',
                                        children: Object(PZ.jsx)('i', {
                                          className: 'fas fa-search fa-w-16 fa-fw',
                                        }),
                                      }),
                                    },
                                  }),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwInnerContentLeftBody,
                        children: [
                          Object(PZ.jsxs)(Pb.a, {
                            id: 'fade-menu',
                            MenuListProps: { 'aria-labelledby': 'fade-button' },
                            anchorEl: dx,
                            open: dm,
                            onClose: function () {
                              dA(null);
                              dE('');
                            },
                            children: [
                              Object(PZ.jsxs)(KT.a, {
                                onClick: function () {
                                  return du();
                                },
                                children: [
                                  Object(PZ.jsx)(PM.a, {
                                    children: Object(PZ.jsx)('i', {
                                      className: 'fas fa-plus',
                                    }),
                                  }),
                                  Object(PZ.jsx)(Pk.a, {
                                    variant: 'inherit',
                                    style: { color: '#fff' },
                                    children: 'Create Warrant',
                                  }),
                                ],
                              }),
                              Object(PZ.jsxs)(KT.a, {
                                onClick: function () {
                                  return (
                                    dA(null),
                                    dE(''),
                                    dw(true),
                                    void KS('ev-mdw:deleteWarrant', {
                                      id: dB,
                                    }).then(function (da) {
                                      dw(false);
                                      dX(da.data);
                                      dj(da.data);
                                    })
                                  );
                                },
                                children: [
                                  Object(PZ.jsx)(PM.a, {
                                    children: Object(PZ.jsx)('i', {
                                      className: 'fas fa-times',
                                    }),
                                  }),
                                  Object(PZ.jsx)(Pk.a, {
                                    variant: 'inherit',
                                    style: { color: '#fff' },
                                    children: 'Delete Warrant',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          dg && dg.length > 0
                            ? dg.map(function (da) {
                                return Object(PZ.jsx)('div', {
                                  className: 'component-paper cursor-pointer',
                                  style: {
                                    width: '100%',
                                    borderBottom: '0px solid #fff',
                                    borderRadius: '0px',
                                    backgroundColor: '#222831',
                                  },
                                  onClick: function (dH) {
                                    return (dy = dH), (dp = da.id), dA(dy.currentTarget), void dE(dp);
                                    var dy, dp;
                                  },
                                  children: Object(PZ.jsxs)('div', {
                                    className: 'main-container',
                                    children: [
                                      Object(PZ.jsx)('div', {
                                        className: 'image',
                                        children: Object(PZ.jsx)('img', {
                                          alt: '',
                                          src: da.image,
                                          style: {
                                            height: '150px',
                                            maxHeight: '150px',
                                            minHeight: '150px',
                                          },
                                        }),
                                      }),
                                      Object(PZ.jsxs)('div', {
                                        className: 'details',
                                        children: [
                                          Object(PZ.jsxs)('div', {
                                            className: 'description',
                                            children: [
                                              Object(PZ.jsx)('div', {
                                                className: 'flex-row',
                                                children: Object(PZ.jsx)(Pk.a, {
                                                  style: {
                                                    color: '#fff',
                                                    wordBreak: 'break-word',
                                                  },
                                                  variant: 'body1',
                                                  gutterBottom: true,
                                                  children: da.name,
                                                }),
                                              }),
                                              Object(PZ.jsx)('div', {
                                                className: 'flex-row',
                                                children: Object(PZ.jsx)(Pk.a, {
                                                  style: {
                                                    color: '#fff',
                                                    wordBreak: 'break-word',
                                                  },
                                                  variant: 'body2',
                                                  gutterBottom: true,
                                                  children: da.incident,
                                                }),
                                              }),
                                            ],
                                          }),
                                          Object(PZ.jsx)('div', {
                                            className: 'align-bottom',
                                            style: {
                                              display: 'flex',
                                              justifyContent: 'flex-end',
                                              flexDirection: 'column',
                                            },
                                            children: Object(PZ.jsxs)('div', {
                                              className: 'flex-row',
                                              style: {
                                                justifyContent: 'space-between',
                                              },
                                              children: [
                                                Object(PZ.jsxs)(Pk.a, {
                                                  style: {
                                                    color: '#fff',
                                                    wordBreak: 'break-word',
                                                  },
                                                  variant: 'body2',
                                                  gutterBottom: true,
                                                  children: ['ID: ', da.id],
                                                }),
                                                Object(PZ.jsxs)(Pk.a, {
                                                  style: {
                                                    color: '#fff',
                                                    wordBreak: 'break-word',
                                                  },
                                                  variant: 'body2',
                                                  gutterBottom: true,
                                                  children: ['expires in ', Pu()(Pu()().valueOf()).diff(1000 * Number(da.expiry), 'days')],
                                                }),
                                              ],
                                            }),
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                });
                              })
                            : Object(PZ.jsx)(PZ.Fragment, {}),
                        ],
                      }),
                    ],
                  }),
                  Object(PZ.jsx)('div', {
                    className: dq.mdwInnerContentDivider,
                  }),
                  Object(PZ.jsxs)('div', {
                    className: dq.mdwDashboardInnerContentMiddle,
                    children: [
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwDashboardInnerContentMiddleHeader,
                        children: [
                          Object(PZ.jsx)('div', {
                            className: 'mdw-dashboard-inner-content-middle-header-text-left',
                            children: Object(PZ.jsx)(Pk.a, {
                              style: {
                                color: '#fff',
                                wordBreak: 'break-word',
                              },
                              variant: 'h6',
                              gutterBottom: true,
                              children: 'BOLO',
                            }),
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwDashboardInnerContentMiddleHeaderTextRight,
                            children: Object(PZ.jsx)('div', {
                              className: 'input-wrapper',
                              children: Object(PZ.jsx)(Kk.a, {
                                fullWidth: true,
                                sx: { width: '100%' },
                                children: Object(PZ.jsx)(KB.a, {
                                  sx: {
                                    '& .MuiInput-root': {
                                      color: 'white !important',
                                    },
                                    '& label.Mui-focused': {
                                      color: 'darkgray !important',
                                    },
                                    '& Mui-focused': {
                                      color: 'darkgray !important',
                                    },
                                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderColor: 'darkgray !important' },
                                    '& .MuiInput-underline:before': {
                                      borderColor: 'darkgray !important',
                                      color: 'darkgray !important',
                                    },
                                    '& .MuiInput-underline:after': {
                                      borderColor: 'white !important',
                                      color: 'darkgray !important',
                                    },
                                    '& .Mui-focused:after': {
                                      color: 'darkgray !important',
                                    },
                                    '& .MuiInputAdornment-root': {
                                      color: 'darkgray !important',
                                    },
                                  },
                                  id: 'input-with-icon-textfield',
                                  label: 'Search',
                                  variant: 'standard',
                                  InputProps: {
                                    startAdornment: Object(PZ.jsx)(KE.a, {
                                      position: 'start',
                                      children: Object(PZ.jsx)('i', {
                                        className: 'fas fa-search fa-w-16 fa-fw',
                                      }),
                                    }),
                                  },
                                }),
                              }),
                            }),
                          }),
                        ],
                      }),
                      Object(PZ.jsx)('div', {
                        className: dq.mdwDashboardInnerContentMiddleBody,
                      }),
                    ],
                  }),
                  Object(PZ.jsx)('div', {
                    className: dq.mdwInnerContentDivider,
                  }),
                  Object(PZ.jsxs)('div', {
                    className: dq.mdwDashboardInnerContentRight,
                    children: [
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwDashboardInnerContentRightHeader,
                        children: [
                          Object(PZ.jsx)('div', {
                            className: 'mdw-dashboard-inner-content-right-header-text-left',
                            children: Object(PZ.jsx)(Pk.a, {
                              style: {
                                color: '#fff',
                                wordBreak: 'break-word',
                              },
                              variant: 'h6',
                              gutterBottom: true,
                              children: 'Bulletin Board',
                            }),
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwDashboardInnerContentRightHeaderTextRight,
                            children: Object(PZ.jsx)('div', {
                              className: 'input-wrapper',
                              children: Object(PZ.jsx)(Kk.a, {
                                fullWidth: true,
                                sx: { width: '100%' },
                                children: Object(PZ.jsx)(KB.a, {
                                  sx: {
                                    '& .MuiInput-root': {
                                      color: 'white !important',
                                    },
                                    '& label.Mui-focused': {
                                      color: 'darkgray !important',
                                    },
                                    '& Mui-focused': {
                                      color: 'darkgray !important',
                                    },
                                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderColor: 'darkgray !important' },
                                    '& .MuiInput-underline:before': {
                                      borderColor: 'darkgray !important',
                                      color: 'darkgray !important',
                                    },
                                    '& .MuiInput-underline:after': {
                                      borderColor: 'white !important',
                                      color: 'darkgray !important',
                                    },
                                    '& .Mui-focused:after': {
                                      color: 'darkgray !important',
                                    },
                                    '& .MuiInputAdornment-root': {
                                      color: 'darkgray !important',
                                    },
                                  },
                                  id: 'input-with-icon-textfield',
                                  label: 'Search',
                                  variant: 'standard',
                                  InputProps: {
                                    startAdornment: Object(PZ.jsx)(KE.a, {
                                      position: 'start',
                                      children: Object(PZ.jsx)('i', {
                                        className: 'fas fa-search fa-w-16 fa-fw',
                                      }),
                                    }),
                                  },
                                }),
                              }),
                            }),
                          }),
                        ],
                      }),
                      Object(PZ.jsx)('div', {
                        className: dq.mdwDashboardInnerContentRight,
                      }),
                    ],
                  }),
                ],
              }),
            }),
          });
        },
        Po = K2(804),
        PH = K2(822),
        PG = K2(823),
        Py = K2(808),
        Pp = Object(PB.a)({
          mdwIncidentsOuterContent: {
            width: '90%',
            height: '100%',
            padding: '8px',
          },
          mdwIncidentsInnerContent: {
            width: '100%',
            height: '100%',
            display: 'flex',
          },
          mdwIncidentsInnerContentLeft: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwIncidentsInnerContentLeftHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwIncidentsInnerContentMiddle: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwIncidentsInnerContentMiddleHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwIncidentsInnerContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwIncidentsInnerContentRightHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwIncidentsInnerContentRightHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwIncidentsContentWrapperRight: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
          mdwIncidentsContentWrapperMiddle: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
          mdwIncidentsTextContentMiddle: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
            paddingBottom: '1.5%',
          },
          mdwIncidentsAddCriminalContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwIncidentsEvidenceContentMiddle: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwIncidentsOfficersInvolvedContentMiddle: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwIncidentsPersonsInvolvedContentMiddle: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwIncidentsTagsContentMiddle: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwIncidentsVehiclesContentMiddle: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwIncidentsCriminalContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwIncidentsInnerContainer: {
            width: '98vw',
            height: '96vh',
            display: 'flex',
            opacity: '1',
            position: 'absolute',
            transition: 'top 400ms ease-out 0s',
            flexDirection: 'column',
            backgroundColor: 'rgb(48, 71, 94)',
          },
          mdwIncidentsInnerContentLeftHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwIncidentsInnerContentLeftBody: {
            flex: '1 1 0%',
            width: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwInnerContentDivider: { width: '16px' },
          mdwIncidentsInnerContentMiddleHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwIncidentsInnerContentMiddleBody: {
            flex: '1 1 0%',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwIncidentsInnerContentRightBody: {
            flex: '1 1 0%',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          checkbox: {
            '&:hover': { backgroundColor: 'transparent !important' },
          },
        }),
        PV = K2(85),
        Pn = K2.n(PV),
        PF = K2(803),
        Pc = K2(801),
        PJ = K2(807),
        Pl = function () {
          var dq = Pp(),
            dU = Object(Kb.c)(Kt),
            dQ = Object(KK.a)(dU, 2),
            dh = dQ[0],
            dX = (dQ[1], Object(Kb.c)(KO)),
            dI = Object(KK.a)(dX, 2),
            dS = dI[0],
            dg = (dI[1], Object(Kb.c)(Kz)),
            dj = Object(KK.a)(dg, 2),
            dr = dj[0],
            dk = (dj[1], Object(Kb.c)(KN)),
            dB = Object(KK.a)(dk, 2),
            dE = dB[0],
            dT = (dB[1], Object(K4.useState)(false)),
            dZ = Object(KK.a)(dT, 2),
            dx = dZ[0],
            dA = dZ[1],
            dm = Object(Kb.c)(Kv),
            di = Object(KK.a)(dm, 2),
            df = (di[0], di[1]),
            db = Object(Kb.c)(KW),
            dM = Object(KK.a)(db, 2),
            dv = dM[0],
            dw = dM[1],
            du = Object(Kb.c)(P0),
            da = Object(KK.a)(du, 2),
            dH = da[0],
            dG = da[1],
            dy = Object(K4.useState)({}),
            dp = Object(KK.a)(dy, 2),
            dV = (dp[0], dp[1]),
            dn = Object(Kb.c)(P3),
            dF = Object(KK.a)(dn, 2),
            dc = dF[0],
            dJ = dF[1],
            dl = Object(K4.useState)(''),
            dY = Object(KK.a)(dl, 2),
            dD = dY[0],
            dL = dY[1],
            dR = Object(K4.useState)(''),
            ds = Object(KK.a)(dR, 2),
            dO = ds[0],
            dC = ds[1],
            dz = Object(K4.useState)(''),
            dN = Object(KK.a)(dz, 2),
            dW = dN[0],
            q0 = dN[1],
            q1 = Object(Kb.c)(P4),
            q2 = Object(KK.a)(q1, 2),
            q3 = q2[0],
            q4 = q2[1],
            q5 = Object(Kb.c)(P5),
            q6 = Object(KK.a)(q5, 2),
            q7 = q6[0],
            q8 = q6[1],
            q9 = Object(Kb.c)(P7),
            qK = Object(KK.a)(q9, 2),
            qP = qK[0],
            qd = qK[1],
            qq = Object(K4.useState)([]),
            qU = Object(KK.a)(qq, 2),
            qQ = (qU[0], qU[1]),
            qh = Object(K4.useState)([]),
            qX = Object(KK.a)(qh, 2),
            qI = (qX[0], qX[1]),
            qS = Object(Kb.c)(P8),
            qg = Object(KK.a)(qS, 2),
            qj = qg[0],
            qr = qg[1],
            qk = Object(Kb.c)(P9),
            qB = Object(KK.a)(qk, 2),
            qE = (qB[0], qB[1]),
            qT = Object(Kb.c)(PK),
            qZ = Object(KK.a)(qT, 2),
            qx = (qZ[0], qZ[1]),
            qA = Object(Kb.c)(PP),
            qm = Object(KK.a)(qA, 2),
            qi = (qm[0], qm[1]),
            qf = Object(Kb.c)(PU),
            qb = Object(KK.a)(qf, 2),
            qM = (qb[0], qb[1]),
            qv = Object(Kb.c)(PQ),
            qw = Object(KK.a)(qv, 2),
            qu = (qw[0], qw[1]),
            qa = Object(Kb.c)(Ph),
            qo = Object(KK.a)(qa, 2),
            qH = (qo[0], qo[1]),
            qG = Object(Kb.c)(PI),
            qy = Object(KK.a)(qG, 2),
            qp = (qy[0], qy[1]),
            qV = Object(Kb.c)(PS),
            qn = Object(KK.a)(qV, 2),
            qF = (qn[0], qn[1]),
            qc = Object(Kb.c)(Pg),
            qJ = Object(KK.a)(qc, 2),
            ql = (qJ[0], qJ[1]),
            qY = Object(K4.useState)(new Date()),
            qD = Object(KK.a)(qY, 2),
            qL = qD[0],
            qR = qD[1],
            qs = Object(K4.useState)(''),
            qO = Object(KK.a)(qs, 2),
            qC = qO[0],
            qz = qO[1],
            qN = Object(Kb.c)(KY),
            qW = Object(KK.a)(qN, 2),
            U0 = (qW[0], qW[1]),
            U1 = Object(Kb.c)(Pj),
            U2 = Object(KK.a)(U1, 2),
            U3 = (U2[0], U2[1]);
          Object(K4.useEffect)(function () {
            Kq() ||
              KS('ev-mdw:fetchIncidents', {}).then(function (U7) {
                dw(U7.data);
                dG(U7.data);
              });
          }, []);
          var U4 = function (U6) {
              df(true);
              var U8 = q3.filter(function (U9) {
                return U9.id.toString() !== U6.toString();
              });
              KS('ev-mdw:updateIncident', {
                id: dc,
                value: U8,
                type: 'evidence',
                add: false,
              }).then(function (U9) {
                df(false);
                q4(U8);
              });
            },
            U5 = function (U6, U7, U8) {
              var UK = Object(K9.a)(qj);
              if ('warrant' === U6) {
                var UP = UK.findIndex(function (UQ) {
                  return UQ.cid.toString() === U7.toString();
                });
                UK[UP].warrant = U8;
                qr(UK);
              } else {
                if ('warrantdate' === U6) {
                  var Ud = UK.findIndex(function (UQ) {
                    return UQ.cid.toString() === U7.toString();
                  });
                  UK[Ud].warrantdate = Pu()(U8).format('X');
                  qr(UK);
                  qR(U8);
                } else {
                  if ('guilty' === U6) {
                    var Uq = UK.findIndex(function (UQ) {
                      return UQ.cid.toString() === U7.toString();
                    });
                    UK[Uq].guilty = U8;
                    qr(UK);
                  } else {
                    if ('processed' === U6) {
                      var UU = UK.findIndex(function (UQ) {
                        return UQ.cid.toString() === U7.toString();
                      });
                      UK[UU].processed = U8;
                      qr(UK);
                    }
                  }
                }
              }
            };
          return Object(PZ.jsx)(PZ.Fragment, {
            children: Object(PZ.jsx)('div', {
              className: dq.mdwIncidentsOuterContent,
              children: Object(PZ.jsxs)('div', {
                className: dq.mdwIncidentsInnerContent,
                children: [
                  Object(PZ.jsxs)('div', {
                    className: dq.mdwIncidentsInnerContentLeft,
                    children: [
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwIncidentsInnerContentLeftHeader,
                        children: [
                          Object(PZ.jsx)('div', {
                            className: 'mdw-incidents-inner-content-left-header-text-left',
                            children: Object(PZ.jsx)(Pk.a, {
                              style: {
                                color: '#fff',
                                wordBreak: 'break-word',
                              },
                              variant: 'h6',
                              gutterBottom: true,
                              children: 'Incidents',
                            }),
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwIncidentsInnerContentLeftHeaderTextRight,
                            children: Object(PZ.jsx)('div', {
                              className: 'input-wrapper',
                              children: Object(PZ.jsx)(Kk.a, {
                                fullWidth: true,
                                sx: { width: '100%' },
                                children: Object(PZ.jsx)(KB.a, {
                                  sx: {
                                    '& .MuiInput-root': {
                                      color: 'white !important',
                                    },
                                    '& label.Mui-focused': {
                                      color: 'darkgray !important',
                                    },
                                    '& Mui-focused': {
                                      color: 'darkgray !important',
                                    },
                                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderColor: 'darkgray !important' },
                                    '& .MuiInput-underline:before': {
                                      borderColor: 'darkgray !important',
                                      color: 'darkgray !important',
                                    },
                                    '& .MuiInput-underline:after': {
                                      borderColor: 'white !important',
                                      color: 'darkgray !important',
                                    },
                                    '& .Mui-focused:after': {
                                      color: 'darkgray !important',
                                    },
                                    '& .MuiInputAdornment-root': {
                                      color: 'darkgray !important',
                                    },
                                  },
                                  id: 'input-with-icon-textfield',
                                  label: 'Search',
                                  variant: 'standard',
                                  onChange: function (U6) {
                                    return (function (U8) {
                                      if ((dA(true), '' !== U8)) {
                                        var UK = dv.filter(function (UP) {
                                          var Ud, Uq, UU, UQ, Uh, UX;
                                          return (
                                            UP.id.toString().toLowerCase().startsWith(U8.toLowerCase()) ||
                                            UP.title.toString().toLowerCase().startsWith(U8.toLowerCase()) ||
                                            UP.author.toString().toLowerCase().startsWith(U8.toLowerCase()) ||
                                            UP.info.toString().toLowerCase().startsWith(U8.toLowerCase()) ||
                                            (null === (Ud = UP.evidence) || void 0 === Ud ? void 0 : Ud.toLowerCase().includes(U8.toLowerCase())) ||
                                            (null === (Uq = UP.officers) || void 0 === Uq ? void 0 : Uq.toLowerCase().includes(U8.toLowerCase())) ||
                                            (null === (UU = UP.persons) || void 0 === UU ? void 0 : UU.toLowerCase().includes(U8.toLowerCase())) ||
                                            (null === (UQ = UP.tags) || void 0 === UQ ? void 0 : UQ.toLowerCase().includes(U8.toLowerCase())) ||
                                            (null === (Uh = UP.vehicles) || void 0 === Uh ? void 0 : Uh.toLowerCase().includes(U8.toLowerCase())) ||
                                            (null === (UX = UP.criminals) || void 0 === UX ? void 0 : UX.toLowerCase().includes(U8.toLowerCase()))
                                          );
                                        });
                                        dG(UK);
                                        dA(false);
                                      } else {
                                        dA(false);
                                        dG(dv);
                                      }
                                    })(U6.target.value);
                                  },
                                  InputProps: {
                                    startAdornment: Object(PZ.jsx)(KE.a, {
                                      position: 'start',
                                      children: Object(PZ.jsx)('i', {
                                        className: 'fas fa-search fa-w-16 fa-fw',
                                      }),
                                    }),
                                  },
                                }),
                              }),
                            }),
                          }),
                        ],
                      }),
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwIncidentsInnerContentLeftBody,
                        children: [
                          dH && dH.length > 0
                            ? dH.map(function (U6) {
                                return Object(PZ.jsx)(
                                  'div',
                                  {
                                    onClick: function () {
                                      return (
                                        (U9 = U6.id),
                                        df(true),
                                        void KS('ev-mdw:loadIncident', {
                                          value: U9,
                                        }).then(function (UK) {
                                          dA(false);
                                          dV([]);
                                          dJ(0);
                                          dL('');
                                          dC('Content goes here...');
                                          q0('Content goes here...');
                                          q8([]);
                                          qd([]);
                                          qQ([]);
                                          qI([]);
                                          qr([]);
                                          (void 0 === UK.data.data && null === UK.data.data) || dV(UK.data.data);
                                          (void 0 === UK.data.id && null === UK.data.id) || dJ(UK.data.id);
                                          (void 0 === UK.data.title && null === UK.data.title) || dL(UK.data.title);
                                          (void 0 === UK.data.info && null === UK.data.info) || (dC(UK.data.info), q0(UK.data.info));
                                          (void 0 === UK.data.officers && null === UK.data.officers) || q8(UK.data.officers);
                                          (void 0 === UK.data.persons && null === UK.data.persons) || qd(UK.data.persons);
                                          (void 0 === UK.data.criminals && null === UK.data.criminals) || qr(UK.data.criminals);
                                          (void 0 === UK.data.evidence && null === UK.data.evidence) || q4(UK.data.evidence);
                                          df(false);
                                        })
                                      );
                                      var U9;
                                    },
                                    id: U6.id,
                                    className: 'component-paper cursor-pointer',
                                    style: {
                                      width: '100%',
                                      borderBottom: '0px solid #fff',
                                      borderRadius: '0px',
                                      backgroundColor: '#222831',
                                    },
                                    children: Object(PZ.jsx)('div', {
                                      className: 'main-container',
                                      children: Object(PZ.jsx)('div', {
                                        className: 'details',
                                        children: Object(PZ.jsxs)('div', {
                                          className: 'description',
                                          children: [
                                            Object(PZ.jsx)('div', {
                                              className: 'flex-row',
                                              children: Object(PZ.jsx)(Pk.a, {
                                                style: {
                                                  color: '#fff',
                                                  wordBreak: 'break-word',
                                                },
                                                variant: 'body2',
                                                gutterBottom: true,
                                                children: U6.title,
                                              }),
                                            }),
                                            Object(PZ.jsxs)('div', {
                                              className: 'flex-row',
                                              style: {
                                                justifyContent: 'space-between',
                                              },
                                              children: [
                                                Object(PZ.jsxs)(Pk.a, {
                                                  style: {
                                                    color: '#fff',
                                                    wordBreak: 'break-word',
                                                  },
                                                  variant: 'body2',
                                                  gutterBottom: true,
                                                  children: ['ID: ', U6.id],
                                                }),
                                                Object(PZ.jsxs)(Pk.a, {
                                                  style: {
                                                    color: '#fff',
                                                    wordBreak: 'break-word',
                                                  },
                                                  variant: 'body2',
                                                  gutterBottom: true,
                                                  children: [U6.author, ' \u2500 ', Pu()(1000 * U6.unix).fromNow()],
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      }),
                                    }),
                                  },
                                  U6.id,
                                );
                              })
                            : Object(PZ.jsx)(PZ.Fragment, {}),
                          Object(PZ.jsx)('div', {
                            className: 'spinner-wrapper',
                            style: {
                              display: dx ? '' : 'none',
                              alignItems: 'baseline',
                              marginTop: '15%',
                            },
                            children: Object(PZ.jsxs)('div', {
                              className: 'lds-spinner',
                              children: [
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                              ],
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  Object(PZ.jsx)('div', {
                    className: dq.mdwInnerContentDivider,
                  }),
                  Object(PZ.jsxs)('div', {
                    className: dq.mdwIncidentsContentWrapperRight,
                    style: { overflowY: 'auto' },
                    children: [
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwIncidentsTextContentMiddle,
                        children: [
                          Object(PZ.jsxs)('div', {
                            className: dq.mdwIncidentsInnerContentMiddleHeader,
                            children: [
                              Object(PZ.jsx)('div', {
                                className: 'mdw-incidents-inner-content-middle-header-text-left',
                                children: Object(PZ.jsx)(Pk.a, {
                                  style: {
                                    color: '#fff',
                                    wordBreak: 'break-word',
                                  },
                                  variant: 'h6',
                                  gutterBottom: true,
                                  children: 0 !== dc ? 'Edit Incident (#'.concat(dc, ')') : 'Create Incident',
                                }),
                              }),
                              Object(PZ.jsx)('div', {
                                className: dq.mdwIncidentsInnerContentMiddleHeaderTextRight,
                                style: { paddingRight: '0px' },
                                children: Object(PZ.jsxs)(KZ.a, {
                                  direction: 'row',
                                  spacing: 1,
                                  children: [
                                    Object(PZ.jsx)('div', {
                                      children: Object(PZ.jsx)(Pf.a, {
                                        title: 'Create New Incident',
                                        placement: 'top',
                                        sx: {
                                          backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                        },
                                        arrow: true,
                                        children: Object(PZ.jsx)('i', {
                                          onClick: function () {
                                            dV([]);
                                            dJ(0);
                                            dL('');
                                            dC(
                                              '**LSPD Report** \n' +
                                                Pu()().format('YYYY-MM-DD HH:MM:SS') +
                                                '\n **Reporting Officer** \n @' +
                                                dE +
                                                ' ' +
                                                dr +
                                                ' ' +
                                                dh +
                                                ' ' +
                                                dS +
                                                '\n **Assisting Officer/s:** \n **Suspect/s:** \n **Victim/s:** \n **Witnesses:** \n **Location:** \n **Debrief:**',
                                            );
                                            q0(
                                              '**LSPD Report** \n' +
                                                Pu()().format('YYYY-MM-DD HH:MM:SS') +
                                                '\n **Reporting Officer** \n @' +
                                                dE +
                                                ' ' +
                                                dr +
                                                ' ' +
                                                dh +
                                                ' ' +
                                                dS +
                                                '\n **Assisting Officer/s:** \n **Suspect/s:** \n **Victim/s:** \n **Witnesses:** \n **Location:** \n **Debrief:**',
                                            );
                                            q8([]);
                                            qd([]);
                                            qQ([]);
                                            qI([]);
                                            qr([]);
                                          },
                                          className: 'fas fa-file-alt fa-w-14',
                                          style: {
                                            display: 0 !== dc ? '' : 'none',
                                            color: '#fff',
                                          },
                                        }),
                                      }),
                                    }),
                                    Object(PZ.jsx)('div', {
                                      children: Object(PZ.jsx)(Pf.a, {
                                        title: 'Save Incident',
                                        placement: 'top',
                                        sx: {
                                          backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                        },
                                        arrow: true,
                                        children: Object(PZ.jsx)('i', {
                                          onClick: function () {
                                            return (
                                              (U7 = 0 === dc),
                                              df(true),
                                              void (U7
                                                ? KS('ev-mdw:saveIncident', {
                                                    id: 0,
                                                    title: dD,
                                                    info: dW,
                                                    shouldCreate: U7,
                                                  }).then(function (U9) {
                                                    (void 0 === U9.data.incident.data && null === U9.data.incident.data) || dV(U9.data.incident.data);
                                                    (void 0 === U9.data.incident.id && null === U9.data.incident.id) || dJ(U9.data.incident.id);
                                                    (void 0 === U9.data.incident.title && null === U9.data.incident.title) || dL(U9.data.incident.title);
                                                    (void 0 === U9.data.incident.info && null === U9.data.incident.info) || dC(U9.data.incident.info);
                                                    (void 0 === U9.data.incident.officers && null === U9.data.incident.officers) || q8(U9.data.incident.officers);
                                                    (void 0 === U9.data.incident.persons && null === U9.data.incident.persons) || qd(U9.data.incident.persons);
                                                    (void 0 === U9.data.incident.criminals && null === U9.data.incident.criminals) || qr(U9.data.incident.criminals);
                                                    (void 0 === U9.data.incident.evidence && null === U9.data.incident.evidence) || q4(U9.data.incident.evidence);
                                                    dw(U9.data.incidents);
                                                    dG(U9.data.incidents);
                                                    df(false);
                                                  })
                                                : KS('ev-mdw:saveIncident', {
                                                    id: dc,
                                                    title: dD,
                                                    info: dW,
                                                    evidence: q3,
                                                    officers: q7,
                                                    persons: qP,
                                                    shouldCreate: U7,
                                                  }).then(function (U9) {
                                                    df(false);
                                                    dw(U9.data.incidents);
                                                    dG(U9.data.incidents);
                                                  }))
                                            );
                                            var U7;
                                          },
                                          className: 'fas fa-save fa-w-14',
                                          style: { color: '#fff' },
                                        }),
                                      }),
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          }),
                          Object(PZ.jsx)('div', {
                            className: 'mdw-inner-content-pre-wrapper',
                            style: {
                              display: 'flex',
                              flexDirection: 'column',
                            },
                            children: Object(PZ.jsx)('div', {
                              className: dq.mdwIncidentsInnerContentMiddleBody,
                              style: { flexDirection: 'row' },
                              children: Object(PZ.jsx)('div', {
                                className: 'mdw-create-inputs',
                                style: { width: '100%' },
                                children: Object(PZ.jsx)('div', {
                                  className: 'input-wrapper',
                                  style: { marginBottom: '2.5%' },
                                  children: Object(PZ.jsx)(Kk.a, {
                                    fullWidth: true,
                                    sx: { width: '100%' },
                                    children: Object(PZ.jsx)(KB.a, {
                                      sx: {
                                        '& .MuiInput-root': {
                                          color: 'white !important',
                                        },
                                        '& label.Mui-focused': {
                                          color: 'darkgray !important',
                                        },
                                        '& Mui-focused': {
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                          borderColor: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:before': {
                                          borderColor: 'darkgray !important',
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:after': {
                                          borderColor: 'white !important',
                                          color: 'darkgray !important',
                                        },
                                        '& .Mui-focused:after': {
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInputAdornment-root': {
                                          color: 'darkgray !important',
                                        },
                                      },
                                      id: 'input-with-icon-textfield',
                                      label: 'Title',
                                      variant: 'standard',
                                      onChange: function (U6) {
                                        return dL(U6.target.value);
                                      },
                                      value: dD,
                                      InputProps: {
                                        startAdornment: Object(PZ.jsx)(KE.a, {
                                          position: 'start',
                                          children: Object(PZ.jsx)('i', {
                                            className: 'fas fa-pen fa-w-16 fa-fw',
                                          }),
                                        }),
                                      },
                                    }),
                                  }),
                                }),
                              }),
                            }),
                          }),
                          Object(PZ.jsx)('div', {
                            className: 'mdw-create-document',
                            style: {
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              justifyContent: 'center',
                              color: '#fff',
                            },
                            children: Object(PZ.jsx)('div', {
                              className: 'mdw-creat-document-inner-cont',
                              style: {
                                width: '97%',
                                height: '99%',
                              },
                              children: Object(PZ.jsx)(Pn.a, {
                                dark: true,
                                onChange: function (U6) {
                                  var U7 = U6();
                                  q0(U7);
                                },
                                value: dO,
                                disableExtensions: [
                                  'code_inline',
                                  'link',
                                  'ordered_list',
                                  'checkbox_item',
                                  'checkbox_list',
                                  'image',
                                  'placeholder',
                                  'container_notice',
                                  'table',
                                  'emoji',
                                  'td',
                                  'th',
                                  'tr',
                                  'hr',
                                  'code_fence',
                                ],
                              }),
                            }),
                          }),
                        ],
                      }),
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwIncidentsEvidenceContentMiddle,
                        children: [
                          Object(PZ.jsxs)('div', {
                            className: dq.mdwIncidentsInnerContentRightHeader,
                            style: {
                              display: 'flex',
                              width: '100%',
                              padding: '8px',
                              minHeight: '48px',
                              justifyContent: 'space-between',
                            },
                            children: [
                              Object(PZ.jsx)('div', {
                                className: 'mdw-incidents-inner-content-right-header-text-left',
                                children: Object(PZ.jsx)(Pk.a, {
                                  style: {
                                    color: '#fff',
                                    wordBreak: 'break-word',
                                  },
                                  variant: 'h6',
                                  gutterBottom: true,
                                  children: 'Evidence',
                                }),
                              }),
                              Object(PZ.jsx)('div', {
                                className: dq.mdwIncidentsInnerContentRightHeaderTextRight,
                                style: { paddingRight: '0px' },
                                children: Object(PZ.jsx)(KZ.a, {
                                  direction: 'row',
                                  spacing: 1,
                                  children: Object(PZ.jsx)('div', {
                                    children: Object(PZ.jsx)(Pf.a, {
                                      title: 'Add Evidence',
                                      placement: 'top',
                                      sx: {
                                        backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                      },
                                      arrow: true,
                                      children: Object(PZ.jsx)('i', {
                                        onClick: function () {
                                          return qu(true);
                                        },
                                        className: 'fas fa-plus fa-w-14',
                                        style: {
                                          display: 0 !== dc ? '' : 'none',
                                          color: '#fff',
                                        },
                                      }),
                                    }),
                                  }),
                                }),
                              }),
                            ],
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwIncidentsInnerContentMiddleBody,
                            style: {
                              display: 0 !== dc ? '' : 'none',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              flex: '0',
                              overflowY: 'unset',
                            },
                            children:
                              q3 && q3.length > 0
                                ? q3.map(function (U6) {
                                    return Object(PZ.jsx)(PZ.Fragment, {
                                      children:
                                        'photo' === U6.type
                                          ? Object(PZ.jsxs)(PZ.Fragment, {
                                              children: [
                                                Object(PZ.jsx)('div', {
                                                  id: U6.id,
                                                  style: {
                                                    paddingRight: '1.5%',
                                                    paddingBottom: '1.5%',
                                                    maxWidth: '100%',
                                                  },
                                                  onMouseEnter: function (U9) {
                                                    return qz(U9.currentTarget.id);
                                                  },
                                                  onMouseLeave: function () {
                                                    return qz('');
                                                  },
                                                  children: Object(PZ.jsx)(KA.a, {
                                                    label: 'Photo ('.concat(U6.description, ')'),
                                                    onDelete: function () {
                                                      return U4(U6.id);
                                                    },
                                                    sx: {
                                                      backgroundColor: '#4ea551',
                                                      color: '#000',
                                                      '& .MuiChip-deleteIcon': { color: '#000' },
                                                      '& .MuiChip-deleteIcon:hover': {
                                                        color: 'rgba(0, 0, 0, 0.5)',
                                                      },
                                                    },
                                                  }),
                                                }),
                                                Object(PZ.jsx)(Po.a, {
                                                  open: qC.toString() === U6.id.toString(),
                                                  style: {
                                                    zIndex: 1000,
                                                    left: '40%',
                                                    top: '10%',
                                                  },
                                                  placement: 'bottom-end',
                                                  disablePortal: false,
                                                  modifiers: [
                                                    {
                                                      name: 'flip',
                                                      enabled: false,
                                                      options: {
                                                        altBoundary: false,
                                                        rootBoundary: 'document',
                                                        padding: 8,
                                                      },
                                                    },
                                                    {
                                                      name: 'preventOverflow',
                                                      enabled: false,
                                                      options: {
                                                        altAxis: false,
                                                        altBoundary: true,
                                                        tether: false,
                                                        rootBoundary: 'document',
                                                        padding: 8,
                                                      },
                                                    },
                                                  ],
                                                  children: Object(PZ.jsx)('div', {
                                                    children: Object(PZ.jsx)('img', {
                                                      alt: '',
                                                      src: U6.identifier,
                                                      style: {
                                                        maxHeight: '600px',
                                                        maxWidth: '800px',
                                                      },
                                                    }),
                                                  }),
                                                }),
                                              ],
                                            })
                                          : 'other' === U6.type
                                          ? Object(PZ.jsx)(PZ.Fragment, {})
                                          : 'blood' === U6.type
                                          ? Object(PZ.jsx)(PZ.Fragment, {
                                              children: Object(PZ.jsx)('div', {
                                                id: U6.id,
                                                style: {
                                                  paddingRight: '1.5%',
                                                  paddingBottom: '1.5%',
                                                  maxWidth: '100%',
                                                },
                                                children: Object(PZ.jsx)(KA.a, {
                                                  label: ''.concat(U6.identifier, ' - (').concat(U6.description, ')'),
                                                  onDelete: function () {
                                                    return U4(U6.id);
                                                  },
                                                  sx: {
                                                    backgroundColor: '#ef4233',
                                                    color: '#fff',
                                                    '& .MuiChip-deleteIcon': {
                                                      color: '#fff',
                                                    },
                                                    '& .MuiChip-deleteIcon:hover': {
                                                      color: 'rgba(255, 255, 255, 0.5)',
                                                    },
                                                  },
                                                }),
                                              }),
                                            })
                                          : 'casing' === U6.type
                                          ? Object(PZ.jsx)(PZ.Fragment, {
                                              children: Object(PZ.jsx)('div', {
                                                id: U6.id,
                                                style: {
                                                  paddingRight: '1.5%',
                                                  paddingBottom: '1.5%',
                                                  maxWidth: '100%',
                                                },
                                                children: Object(PZ.jsx)(KA.a, {
                                                  label: 'Identifier: '.concat(U6.identifier, ' - (').concat(U6.description, ')'),
                                                  onDelete: function () {
                                                    return U4(U6.id);
                                                  },
                                                  sx: {
                                                    backgroundColor: '#81ba64',
                                                    color: '#000',
                                                    '& .MuiChip-deleteIcon': {
                                                      color: '#000',
                                                    },
                                                    '& .MuiChip-deleteIcon:hover': {
                                                      color: 'rgba(0, 0, 0, 0.5)',
                                                    },
                                                  },
                                                }),
                                              }),
                                            })
                                          : 'weapon' === U6.type
                                          ? Object(PZ.jsx)(PZ.Fragment, {
                                              children: Object(PZ.jsx)('div', {
                                                id: U6.id,
                                                style: {
                                                  paddingRight: '1.5%',
                                                  paddingBottom: '1.5%',
                                                  maxWidth: '100%',
                                                },
                                                children: Object(PZ.jsx)(KA.a, {
                                                  label: ''.concat(U6.identifier, ' - (').concat(U6.description, ')'),
                                                  onDelete: function () {
                                                    return U4(U6.id);
                                                  },
                                                  sx: {
                                                    backgroundColor: '#fff',
                                                    color: '#000',
                                                    '& .MuiChip-deleteIcon': {
                                                      color: '#000',
                                                    },
                                                    '& .MuiChip-deleteIcon:hover': {
                                                      color: 'rgba(0, 0, 0, 0.5)',
                                                    },
                                                  },
                                                }),
                                              }),
                                            })
                                          : Object(PZ.jsx)(PZ.Fragment, {}),
                                    });
                                  })
                                : Object(PZ.jsx)(PZ.Fragment, {}),
                          }),
                        ],
                      }),
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwIncidentsOfficersInvolvedContentMiddle,
                        children: [
                          Object(PZ.jsxs)('div', {
                            className: dq.mdwIncidentsInnerContentRightHeader,
                            style: {
                              display: 'flex',
                              width: '100%',
                              padding: '8px',
                              minHeight: '48px',
                              justifyContent: 'space-between',
                            },
                            children: [
                              Object(PZ.jsx)('div', {
                                className: 'mdw-incidents-inner-content-right-header-text-left',
                                children: Object(PZ.jsx)(Pk.a, {
                                  style: {
                                    color: '#fff',
                                    wordBreak: 'break-word',
                                  },
                                  variant: 'h6',
                                  gutterBottom: true,
                                  children: 'Officers Involved',
                                }),
                              }),
                              Object(PZ.jsx)('div', {
                                className: dq.mdwIncidentsInnerContentRightHeaderTextRight,
                                style: { paddingRight: '0px' },
                                children: Object(PZ.jsx)(KZ.a, {
                                  direction: 'row',
                                  spacing: 1,
                                  children: Object(PZ.jsx)('div', {
                                    children: Object(PZ.jsx)(Pf.a, {
                                      title: 'Add Officer Involved',
                                      placement: 'top',
                                      sx: {
                                        backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                      },
                                      arrow: true,
                                      children: Object(PZ.jsx)('i', {
                                        onClick: function () {
                                          qM(true);
                                          qH(true);
                                          KS('ev-mdw:fetchOfficers', {}).then(function (U6) {
                                            qM(false);
                                            qx(U6.data);
                                            qi(U6.data);
                                          });
                                        },
                                        className: 'fas fa-plus fa-w-14',
                                        style: {
                                          display: 0 !== dc ? '' : 'none',
                                          color: '#fff',
                                        },
                                      }),
                                    }),
                                  }),
                                }),
                              }),
                            ],
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwIncidentsInnerContentMiddleBody,
                            style: {
                              display: 0 !== dc ? '' : 'none',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              flex: '0',
                              overflowY: 'unset',
                            },
                            children:
                              q7 && q7.length > 0
                                ? q7.map(function (U6) {
                                    return Object(PZ.jsx)('div', {
                                      style: {
                                        paddingRight: '1.5%',
                                        paddingBottom: '1.5%',
                                      },
                                      children: Object(PZ.jsx)(KA.a, {
                                        label: '('.concat(U6.callsign, ') ').concat(U6.name),
                                        onDelete: function () {
                                          return (function (U9) {
                                            df(true);
                                            var UP = q7.filter(function (Uq) {
                                              return Uq.cid.toString() !== U9.toString();
                                            });
                                            KS('ev-mdw:updateIncident', {
                                              id: dc,
                                              value: UP,
                                              type: 'officers',
                                              add: false,
                                            }).then(function (Uq) {
                                              df(false);
                                              q8(UP);
                                            });
                                          })(U6.cid);
                                        },
                                        sx: {
                                          backgroundColor: '#fff',
                                          color: '#000',
                                          '& .MuiChip-deleteIcon': {
                                            color: '#000',
                                          },
                                          '& .MuiChip-deleteIcon:hover': {
                                            color: 'rgba(0, 0, 0, 0.5)',
                                          },
                                        },
                                      }),
                                    });
                                  })
                                : Object(PZ.jsx)(PZ.Fragment, {}),
                          }),
                        ],
                      }),
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwIncidentsPersonsInvolvedContentMiddle,
                        children: [
                          Object(PZ.jsxs)('div', {
                            className: dq.mdwIncidentsInnerContentRightHeader,
                            style: {
                              display: 'flex',
                              width: '100%',
                              padding: '8px',
                              minHeight: '48px',
                              justifyContent: 'space-between',
                            },
                            children: [
                              Object(PZ.jsx)('div', {
                                className: 'mdw-incidents-inner-content-right-header-text-left',
                                children: Object(PZ.jsx)(Pk.a, {
                                  style: {
                                    color: '#fff',
                                    wordBreak: 'break-word',
                                  },
                                  variant: 'h6',
                                  gutterBottom: true,
                                  children: 'Persons Involved',
                                }),
                              }),
                              Object(PZ.jsx)('div', {
                                className: dq.mdwIncidentsInnerContentRightHeaderTextRight,
                                style: { paddingRight: '0px' },
                                children: Object(PZ.jsx)(KZ.a, {
                                  direction: 'row',
                                  spacing: 1,
                                  children: Object(PZ.jsx)('div', {
                                    children: Object(PZ.jsx)(Pf.a, {
                                      title: 'Add Person Involved',
                                      placement: 'top',
                                      sx: {
                                        backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                      },
                                      arrow: true,
                                      children: Object(PZ.jsx)('i', {
                                        onClick: function () {
                                          return qp(true);
                                        },
                                        className: 'fas fa-plus fa-w-14',
                                        style: {
                                          display: 0 !== dc ? '' : 'none',
                                          color: '#fff',
                                        },
                                      }),
                                    }),
                                  }),
                                }),
                              }),
                            ],
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwIncidentsInnerContentMiddleBody,
                            style: {
                              display: 0 !== dc ? '' : 'none',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              flex: '0',
                              overflowY: 'unset',
                            },
                            children:
                              qP && qP.length > 0
                                ? qP.map(function (U6) {
                                    return Object(PZ.jsx)('div', {
                                      style: {
                                        paddingRight: '1.5%',
                                        paddingBottom: '1.5%',
                                      },
                                      children: Object(PZ.jsx)(KA.a, {
                                        label: ''.concat(U6.name),
                                        onDelete: function () {
                                          return (function (UK) {
                                            df(true);
                                            var Ud = qP.filter(function (Uq) {
                                              return Uq.cid.toString() !== UK.toString();
                                            });
                                            KS('ev-mdw:updateIncident', {
                                              id: dc,
                                              value: Ud,
                                              type: 'persons',
                                            }).then(function (Uq) {
                                              dA(false);
                                              qd(Ud);
                                            });
                                          })(U6.cid);
                                        },
                                        sx: {
                                          backgroundColor: '#fff',
                                          color: '#000',
                                          '& .MuiChip-deleteIcon': {
                                            color: '#000',
                                          },
                                          '& .MuiChip-deleteIcon:hover': {
                                            color: 'rgba(0, 0, 0, 0.5)',
                                          },
                                        },
                                      }),
                                    });
                                  })
                                : Object(PZ.jsx)(PZ.Fragment, {}),
                          }),
                        ],
                      }),
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwIncidentsTagsContentMiddle,
                        children: [
                          Object(PZ.jsxs)('div', {
                            className: dq.mdwIncidentsInnerContentRightHeader,
                            style: {
                              display: 'flex',
                              width: '100%',
                              padding: '8px',
                              minHeight: '48px',
                              justifyContent: 'space-between',
                            },
                            children: [
                              Object(PZ.jsx)('div', {
                                className: 'mdw-incidents-inner-content-right-header-text-left',
                                children: Object(PZ.jsx)(Pk.a, {
                                  style: {
                                    color: '#fff',
                                    wordBreak: 'break-word',
                                  },
                                  variant: 'h6',
                                  gutterBottom: true,
                                  children: 'Tags',
                                }),
                              }),
                              Object(PZ.jsx)('div', {
                                className: dq.mdwIncidentsInnerContentRightHeaderTextRight,
                                style: { paddingRight: '0px' },
                                children: Object(PZ.jsx)(KZ.a, {
                                  direction: 'row',
                                  spacing: 1,
                                  children: Object(PZ.jsx)('div', {
                                    children: Object(PZ.jsx)(Pf.a, {
                                      title: 'Add Tag',
                                      placement: 'top',
                                      sx: {
                                        backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                      },
                                      arrow: true,
                                      children: Object(PZ.jsx)('i', {
                                        className: 'fas fa-plus fa-w-14',
                                        style: {
                                          display: 0 !== dc ? '' : 'none',
                                          color: '#fff',
                                        },
                                      }),
                                    }),
                                  }),
                                }),
                              }),
                            ],
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwIncidentsInnerContentMiddleBody,
                            style: {
                              display: 0 !== dc ? '' : 'none',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              flex: '0',
                              overflowY: 'unset',
                            },
                          }),
                        ],
                      }),
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwIncidentsVehiclesContentMiddle,
                        children: [
                          Object(PZ.jsxs)('div', {
                            className: dq.mdwIncidentsInnerContentRightHeader,
                            style: {
                              display: 'flex',
                              width: '100%',
                              padding: '8px',
                              minHeight: '48px',
                              justifyContent: 'space-between',
                            },
                            children: [
                              Object(PZ.jsx)('div', {
                                className: 'mdw-incidents-inner-content-right-header-text-left',
                                children: Object(PZ.jsx)(Pk.a, {
                                  style: {
                                    color: '#fff',
                                    wordBreak: 'break-word',
                                  },
                                  variant: 'h6',
                                  gutterBottom: true,
                                  children: 'Vehicles',
                                }),
                              }),
                              Object(PZ.jsx)('div', {
                                className: dq.mdwIncidentsInnerContentRightHeaderTextRight,
                                style: { paddingRight: '0px' },
                                children: Object(PZ.jsx)(KZ.a, {
                                  direction: 'row',
                                  spacing: 1,
                                  children: Object(PZ.jsx)('div', {
                                    children: Object(PZ.jsx)(Pf.a, {
                                      title: 'Add Vehicle',
                                      placement: 'top',
                                      sx: {
                                        backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                      },
                                      arrow: true,
                                      children: Object(PZ.jsx)('i', {
                                        className: 'fas fa-plus fa-w-14',
                                        style: {
                                          display: 0 !== dc ? '' : 'none',
                                          color: '#fff',
                                        },
                                      }),
                                    }),
                                  }),
                                }),
                              }),
                            ],
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwIncidentsInnerContentMiddleBody,
                            style: {
                              display: 0 !== dc ? '' : 'none',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              flex: '0',
                              overflowY: 'unset',
                            },
                          }),
                        ],
                      }),
                    ],
                  }),
                  Object(PZ.jsx)('div', {
                    className: dq.mdwInnerContentDivider,
                  }),
                  Object(PZ.jsxs)('div', {
                    className: dq.mdwIncidentsContentWrapperRight,
                    style: { overflowY: 'auto' },
                    children: [
                      Object(PZ.jsx)('div', {
                        className: dq.mdwIncidentsAddCriminalContentRight,
                        children: Object(PZ.jsxs)('div', {
                          className: dq.mdwIncidentsInnerContentRightHeader,
                          style: {
                            display: 'flex',
                            width: '100%',
                            padding: '8px',
                            minHeight: '48px',
                            justifyContent: 'space-between',
                          },
                          children: [
                            Object(PZ.jsx)('div', {
                              className: 'mdw-incidents-inner-content-right-header-text-left',
                              children: Object(PZ.jsx)(Pk.a, {
                                style: {
                                  color: '#fff',
                                  wordBreak: 'break-word',
                                },
                                variant: 'h6',
                                gutterBottom: true,
                                children: 'Add Criminal Scum',
                              }),
                            }),
                            Object(PZ.jsx)('div', {
                              className: dq.mdwIncidentsInnerContentRightHeaderTextRight,
                              style: { paddingRight: '0px' },
                              children: Object(PZ.jsx)(KZ.a, {
                                direction: 'row',
                                spacing: 1,
                                children: Object(PZ.jsx)('div', {
                                  children: Object(PZ.jsx)(Pf.a, {
                                    title: 'Add Criminal',
                                    placement: 'top',
                                    sx: {
                                      backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                    },
                                    arrow: true,
                                    children: Object(PZ.jsx)('i', {
                                      onClick: function () {
                                        return qF(true);
                                      },
                                      className: 'fas fa-plus fa-w-14',
                                      style: {
                                        display: 0 !== dc ? '' : 'none',
                                        color: '#fff',
                                      },
                                    }),
                                  }),
                                }),
                              }),
                            }),
                          ],
                        }),
                      }),
                      qj && qj.length > 0
                        ? qj.map(function (U6) {
                            return Object(PZ.jsxs)('div', {
                              className: dq.mdwIncidentsCriminalContentRight,
                              style: { display: 0 !== dc ? '' : 'none' },
                              children: [
                                Object(PZ.jsxs)('div', {
                                  className: dq.mdwIncidentsInnerContentRightHeader,
                                  style: {
                                    display: 'flex',
                                    width: '100%',
                                    padding: '8px',
                                    minHeight: '48px',
                                    justifyContent: 'space-between',
                                  },
                                  children: [
                                    Object(PZ.jsx)('div', {
                                      className: 'mdw-incidents-inner-content-right-header-text-left',
                                      children: Object(PZ.jsxs)(Pk.a, {
                                        style: {
                                          color: '#fff',
                                          wordBreak: 'break-word',
                                        },
                                        variant: 'h6',
                                        gutterBottom: true,
                                        children: [U6.name, ' (#', U6.cid, ')'],
                                      }),
                                    }),
                                    Object(PZ.jsx)('div', {
                                      className: dq.mdwIncidentsInnerContentRightHeaderTextRight,
                                      style: { paddingRight: '0px' },
                                      children: Object(PZ.jsxs)(KZ.a, {
                                        direction: 'row',
                                        spacing: 1,
                                        children: [
                                          Object(PZ.jsx)('div', {
                                            children: Object(PZ.jsx)(Pf.a, {
                                              title: 'Delete',
                                              placement: 'top',
                                              sx: {
                                                backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                              },
                                              arrow: true,
                                              children: Object(PZ.jsx)('i', {
                                                onClick: function () {
                                                  return (function (U9) {
                                                    df(true);
                                                    var UP = qj.filter(function (Ud) {
                                                      return Ud.cid.toString() !== U9.toString();
                                                    });
                                                    KS('ev-mdw:updateIncident', {
                                                      id: dc,
                                                      value: UP,
                                                      type: 'criminals',
                                                    }).then(function (Ud) {
                                                      df(false);
                                                      qr(UP);
                                                    });
                                                  })(U6.cid);
                                                },
                                                className: 'fas fa-trash fa-w-14',
                                                style: { color: '#fff' },
                                              }),
                                            }),
                                          }),
                                          Object(PZ.jsx)('div', {
                                            children: Object(PZ.jsx)(Pf.a, {
                                              title: 'Save',
                                              placement: 'top',
                                              sx: {
                                                backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                              },
                                              arrow: true,
                                              children: Object(PZ.jsx)('i', {
                                                onClick: function () {
                                                  return (
                                                    (U9 = U6.cid),
                                                    df(true),
                                                    void KS('ev-mdw:saveCriminal', {
                                                      id: dc,
                                                      cid: U9,
                                                      value: qj,
                                                    }).then(function (UK) {
                                                      df(false);
                                                    })
                                                  );
                                                  var U9;
                                                },
                                                className: 'fas fa-save fa-w-14',
                                                style: { color: '#fff' },
                                              }),
                                            }),
                                          }),
                                        ],
                                      }),
                                    }),
                                  ],
                                }),
                                Object(PZ.jsxs)('div', {
                                  className: dq.mdwIncidentsInnerContentRightBody,
                                  children: [
                                    Object(PZ.jsxs)('div', {
                                      className: 'mdw-inner-content-right-body-wrapper',
                                      style: {
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        flex: '0',
                                        overflowY: 'unset',
                                      },
                                      children: [
                                        Object(PZ.jsx)('div', {
                                          style: {
                                            paddingRight: '1.5%',
                                            paddingBottom: '1.5%',
                                          },
                                          children: Object(PZ.jsx)(KA.a, {
                                            onClick: function () {
                                              return (function (UK) {
                                                if ((U0([]), ql(true), U3(UK), void 0 !== UK)) {
                                                  var Ud = Object(K9.a)(qj),
                                                    Uq = Ud.findIndex(function (UQ) {
                                                      return UQ.cid.toString() === UK.toString();
                                                    }),
                                                    UU = Ud[Uq].charges;
                                                  qE(UU || []);
                                                }
                                                KS('ev-mdw:fetchCharges', {}).then(function (UQ) {
                                                  U0(UQ.data);
                                                });
                                              })(U6.cid);
                                            },
                                            label: 'Edit Charges',
                                            sx: {
                                              backgroundColor: '#fff',
                                              color: '#000',
                                            },
                                          }),
                                        }),
                                        U6.charges && U6.charges.length > 0
                                          ? U6.charges.map(function (U8) {
                                              return Object(PZ.jsx)('div', {
                                                style: {
                                                  paddingRight: '1.5%',
                                                  paddingBottom: '1.5%',
                                                },
                                                children: Object(PZ.jsx)(KA.a, {
                                                  label: U8.title,
                                                  sx: {
                                                    backgroundColor: '#000',
                                                    color: '#fff',
                                                    '& .MuiChip-deleteIcon': {
                                                      color: '#fff',
                                                    },
                                                    '& .MuiChip-deleteIcon:hover': {
                                                      color: 'rgba(255, 255, 255, 0.5)',
                                                    },
                                                  },
                                                }),
                                              });
                                            })
                                          : Object(PZ.jsx)(PZ.Fragment, {}),
                                      ],
                                    }),
                                    Object(PZ.jsx)('div', {
                                      style: {
                                        marginTop: '1%',
                                        marginBottom: '0.3%',
                                      },
                                      children: Object(PZ.jsx)(Km.a, {
                                        style: {
                                          borderColor: 'rgb(34, 40, 49)',
                                        },
                                        variant: 'fullWidth',
                                      }),
                                    }),
                                    Object(PZ.jsxs)('div', {
                                      style: {
                                        flexDirection: 'row',
                                        marginBottom: '2%',
                                        display: 'flex',
                                      },
                                      children: [
                                        Object(PZ.jsx)('div', {
                                          style: {
                                            width: '50%',
                                            position: 'relative',
                                          },
                                          children: Object(PZ.jsx)(PH.a, {
                                            children: Object(PZ.jsx)(PG.a, {
                                              style: {
                                                color: 'rgba(255, 255, 255, 0.7)',
                                              },
                                              control: Object(PZ.jsx)(Py.a, {
                                                color: 'warning',
                                                onChange: function (U8) {
                                                  return U5('warrant', U6.cid, U8.target.checked);
                                                },
                                                disableFocusRipple: true,
                                                disableRipple: true,
                                                checked: U6.warrant,
                                                classes: { root: dq.checkbox },
                                              }),
                                              label: 'Warrant for Arrest',
                                            }),
                                          }),
                                        }),
                                        Object(PZ.jsx)('div', {
                                          style: {
                                            width: '50%',
                                            position: 'relative',
                                            display: U6.warrant ? '' : 'none',
                                          },
                                          children: Object(PZ.jsx)(PH.a, {
                                            style: { marginTop: '5%' },
                                            children: Object(PZ.jsx)(Pc.b, {
                                              dateAdapter: PF.a,
                                              children: Object(PZ.jsx)(PJ.a, {
                                                label: 'Expiration Date',
                                                value: qL,
                                                onChange: function (U8) {
                                                  U5('warrantdate', U6.cid, U8);
                                                },
                                                renderInput: function (U8) {
                                                  return Object(PZ.jsx)(KB.a, Object(K8.a)({ variant: 'standard' }, U8));
                                                },
                                              }),
                                            }),
                                          }),
                                        }),
                                      ],
                                    }),
                                    Object(PZ.jsx)('div', {
                                      style: {
                                        marginTop: '1%',
                                        marginBottom: '0.3%',
                                        display: U6.charges.length > 0 ? '' : 'none',
                                      },
                                      children: Object(PZ.jsx)(Km.a, {
                                        style: {
                                          borderColor: 'rgb(34, 40, 49)',
                                        },
                                        variant: 'fullWidth',
                                      }),
                                    }),
                                    Object(PZ.jsx)('div', {
                                      style: {
                                        marginTop: '1%',
                                        display: U6.charges.length > 0 ? '' : 'none',
                                      },
                                      children: Object(PZ.jsxs)('div', {
                                        style: { marginTop: '1%' },
                                        children: [
                                          Object(PZ.jsx)(Pk.a, {
                                            style: {
                                              color: '#fff',
                                              wordBreak: 'break-word',
                                            },
                                            variant: 'h5',
                                            gutterBottom: true,
                                            children: 'Final',
                                          }),
                                          Object(PZ.jsxs)(Pk.a, {
                                            style: {
                                              color: '#fff',
                                              wordBreak: 'break-word',
                                            },
                                            variant: 'h6',
                                            gutterBottom: true,
                                            children: [
                                              U6.months,
                                              ' months (+0 months parole) / ',
                                              U6.fine.toLocaleString('en-Us', {
                                                style: 'currency',
                                                currency: 'USD',
                                              }),
                                              ' fine / ',
                                              U6.points,
                                              ' point(s)',
                                            ],
                                          }),
                                        ],
                                      }),
                                    }),
                                    Object(PZ.jsx)('div', {
                                      style: {
                                        marginTop: '1%',
                                        marginBottom: '0.3%',
                                        display: U6.charges.length > 0 ? '' : 'none',
                                      },
                                      children: Object(PZ.jsx)(Km.a, {
                                        style: {
                                          borderColor: 'rgb(34, 40, 49)',
                                        },
                                        variant: 'fullWidth',
                                      }),
                                    }),
                                    Object(PZ.jsxs)('div', {
                                      style: {
                                        flexDirection: 'row',
                                        marginBottom: '2%',
                                        display: U6.charges.length > 0 ? 'flex' : 'none',
                                      },
                                      children: [
                                        Object(PZ.jsx)('div', {
                                          style: {
                                            width: '50%',
                                            position: 'relative',
                                          },
                                          children: Object(PZ.jsx)(PH.a, {
                                            children: Object(PZ.jsx)(PG.a, {
                                              style: {
                                                color: 'rgba(255, 255, 255, 0.7)',
                                              },
                                              control: Object(PZ.jsx)(Py.a, {
                                                color: 'warning',
                                                onChange: function (U8) {
                                                  return U5('guilty', U6.cid, U8.target.checked);
                                                },
                                                disableFocusRipple: true,
                                                disableRipple: true,
                                                checked: U6.guilty,
                                                classes: { root: dq.checkbox },
                                              }),
                                              label: 'Pleaded Guilty',
                                            }),
                                          }),
                                        }),
                                        Object(PZ.jsx)('div', {
                                          style: {
                                            width: '50%',
                                            position: 'relative',
                                          },
                                          children: Object(PZ.jsx)(PH.a, {
                                            children: Object(PZ.jsx)(PG.a, {
                                              style: {
                                                color: 'rgba(255, 255, 255, 0.7)',
                                              },
                                              control: Object(PZ.jsx)(Py.a, {
                                                color: 'warning',
                                                onChange: function (U8) {
                                                  return U5('processed', U6.cid, U8.target.checked);
                                                },
                                                disableFocusRipple: true,
                                                disableRipple: true,
                                                checked: U6.processed,
                                                classes: { root: dq.checkbox },
                                              }),
                                              label: 'Processed',
                                            }),
                                          }),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            });
                          })
                        : Object(PZ.jsx)(PZ.Fragment, {}),
                    ],
                  }),
                ],
              }),
            }),
          });
        },
        PY = Object(PB.a)({
          mdwIncidentsOuterContent: {
            width: '90%',
            height: '100%',
            padding: '8px',
          },
          mdwIncidentsInnerContent: {
            width: '100%',
            height: '100%',
            display: 'flex',
          },
          mdwIncidentsInnerContentLeft: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwIncidentsInnerContentLeftHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwIncidentsInnerContentMiddle: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwIncidentsInnerContentMiddleHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwIncidentsInnerContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwIncidentsInnerContentRightHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwIncidentsInnerContentRightHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwIncidentsContentWrapperRight: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
          mdwIncidentsContentWrapperMiddle: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
          mdwIncidentsTextContentMiddle: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
            paddingBottom: '1.5%',
          },
          mdwIncidentsEmsInvolvedContentMiddle: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwIncidentsPersonsInvolvedContentMiddle: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwIncidentsCriminalContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwIncidentsInnerContainer: {
            width: '98vw',
            height: '96vh',
            display: 'flex',
            opacity: '1',
            position: 'absolute',
            transition: 'top 400ms ease-out 0s',
            flexDirection: 'column',
            backgroundColor: 'rgb(48, 71, 94)',
          },
          mdwIncidentsInnerContentLeftHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwIncidentsInnerContentLeftBody: {
            flex: '1 1 0%',
            width: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwInnerContentDivider: { width: '16px' },
          mdwIncidentsInnerContentMiddleHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwIncidentsInnerContentMiddleBody: {
            flex: '1 1 0%',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwIncidentsInnerContentRightBody: {
            flex: '1 1 0%',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          checkbox: {
            '&:hover': { backgroundColor: 'transparent !important' },
          },
        }),
        PD = function () {
          var dq = PY(),
            dU = Object(Kb.c)(Kt),
            dQ = Object(KK.a)(dU, 2),
            dh = dQ[0],
            dX = (dQ[1], Object(Kb.c)(KO)),
            dI = Object(KK.a)(dX, 2),
            dS = dI[0],
            dg = (dI[1], Object(Kb.c)(Kz)),
            dj = Object(KK.a)(dg, 2),
            dr = dj[0],
            dk = (dj[1], Object(Kb.c)(KN)),
            dB = Object(KK.a)(dk, 2),
            dE = dB[0],
            dT = (dB[1], Object(K4.useState)(false)),
            dZ = Object(KK.a)(dT, 2),
            dx = dZ[0],
            dA = dZ[1],
            dm = Object(Kb.c)(Kv),
            di = Object(KK.a)(dm, 2),
            df = (di[0], di[1]),
            db = Object(Kb.c)(P1),
            dM = Object(KK.a)(db, 2),
            dv = dM[0],
            dw = dM[1],
            du = Object(Kb.c)(P2),
            da = Object(KK.a)(du, 2),
            dH = da[0],
            dG = da[1],
            dy = Object(K4.useState)({}),
            dp = Object(KK.a)(dy, 2),
            dV = (dp[0], dp[1]),
            dn = Object(Kb.c)(P3),
            dF = Object(KK.a)(dn, 2),
            dc = dF[0],
            dJ = dF[1],
            dl = Object(K4.useState)(''),
            dY = Object(KK.a)(dl, 2),
            dD = dY[0],
            dL = dY[1],
            dR = Object(K4.useState)(''),
            ds = Object(KK.a)(dR, 2),
            dO = ds[0],
            dC = ds[1],
            dz = Object(K4.useState)(''),
            dN = Object(KK.a)(dz, 2),
            dW = dN[0],
            q0 = dN[1],
            q1 = Object(Kb.c)(P4),
            q2 = Object(KK.a)(q1, 2),
            q3 = q2[0],
            q4 = (q2[1], Object(Kb.c)(P6)),
            q5 = Object(KK.a)(q4, 2),
            q6 = q5[0],
            q7 = q5[1],
            q8 = Object(Kb.c)(P7),
            q9 = Object(KK.a)(q8, 2),
            qK = q9[0],
            qP = q9[1],
            qd = Object(Kb.c)(Pd),
            qq = Object(KK.a)(qd, 2),
            qU = (qq[0], qq[1]),
            qQ = Object(Kb.c)(Pq),
            qh = Object(KK.a)(qQ, 2),
            qX = (qh[0], qh[1]),
            qI = Object(Kb.c)(PU),
            qS = Object(KK.a)(qI, 2),
            qg = (qS[0], qS[1]),
            qj = Object(Kb.c)(PX),
            qr = Object(KK.a)(qj, 2),
            qk = (qr[0], qr[1]),
            qB = Object(Kb.c)(PI),
            qE = Object(KK.a)(qB, 2),
            qT = (qE[0], qE[1]);
          return (
            Object(K4.useEffect)(function () {
              Kq() ||
                KS('ev-mdw:fetchIncidentsEms', {}).then(function (qZ) {
                  dw(qZ.data);
                  dG(qZ.data);
                });
            }, []),
            Object(PZ.jsx)(PZ.Fragment, {
              children: Object(PZ.jsx)('div', {
                className: dq.mdwIncidentsOuterContent,
                children: Object(PZ.jsxs)('div', {
                  className: dq.mdwIncidentsInnerContent,
                  children: [
                    Object(PZ.jsxs)('div', {
                      className: dq.mdwIncidentsInnerContentLeft,
                      children: [
                        Object(PZ.jsxs)('div', {
                          className: dq.mdwIncidentsInnerContentLeftHeader,
                          children: [
                            Object(PZ.jsx)('div', {
                              className: 'mdw-incidents-inner-content-left-header-text-left',
                              children: Object(PZ.jsx)(Pk.a, {
                                style: {
                                  color: '#fff',
                                  wordBreak: 'break-word',
                                },
                                variant: 'h6',
                                gutterBottom: true,
                                children: 'Incidents',
                              }),
                            }),
                            Object(PZ.jsx)('div', {
                              className: dq.mdwIncidentsInnerContentLeftHeaderTextRight,
                              children: Object(PZ.jsx)('div', {
                                className: 'input-wrapper',
                                children: Object(PZ.jsx)(Kk.a, {
                                  fullWidth: true,
                                  sx: { width: '100%' },
                                  children: Object(PZ.jsx)(KB.a, {
                                    sx: {
                                      '& .MuiInput-root': {
                                        color: 'white !important',
                                      },
                                      '& label.Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderColor: 'darkgray !important' },
                                      '& .MuiInput-underline:before': {
                                        borderColor: 'darkgray !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:after': {
                                        borderColor: 'white !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .Mui-focused:after': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInputAdornment-root': {
                                        color: 'darkgray !important',
                                      },
                                    },
                                    id: 'input-with-icon-textfield',
                                    label: 'Search',
                                    variant: 'standard',
                                    onChange: function (qZ) {
                                      return (function (qm) {
                                        if ((dA(true), '' !== qm)) {
                                          var qi = dv.filter(function (qf) {
                                            return (
                                              qf.id.toString().toLowerCase().startsWith(qm.toLowerCase()) ||
                                              qf.title.toString().toLowerCase().startsWith(qm.toLowerCase()) ||
                                              qf.author.toString().toLowerCase().startsWith(qm.toLowerCase()) ||
                                              qf.info.toString().toLowerCase().startsWith(qm.toLowerCase())
                                            );
                                          });
                                          dG(qi);
                                          dA(false);
                                        } else {
                                          dA(false);
                                          dG(dv);
                                        }
                                      })(qZ.target.value);
                                    },
                                    InputProps: {
                                      startAdornment: Object(PZ.jsx)(KE.a, {
                                        position: 'start',
                                        children: Object(PZ.jsx)('i', {
                                          className: 'fas fa-search fa-w-16 fa-fw',
                                        }),
                                      }),
                                    },
                                  }),
                                }),
                              }),
                            }),
                          ],
                        }),
                        Object(PZ.jsxs)('div', {
                          className: dq.mdwIncidentsInnerContentLeftBody,
                          children: [
                            dH && dH.length > 0
                              ? dH.map(function (qZ) {
                                  return Object(PZ.jsx)(
                                    'div',
                                    {
                                      onClick: function () {
                                        return (
                                          (qA = qZ.id),
                                          df(true),
                                          void KS('ev-mdw:loadIncidentEms', {
                                            value: qA,
                                          }).then(function (qi) {
                                            dA(false);
                                            dV([]);
                                            dJ(0);
                                            dL('');
                                            dC('Content goes here...');
                                            q0('Content goes here...');
                                            q7([]);
                                            qP([]);
                                            (void 0 === qi.data.data && null === qi.data.data) || dV(qi.data.data);
                                            (void 0 === qi.data.id && null === qi.data.id) || dJ(qi.data.id);
                                            (void 0 === qi.data.title && null === qi.data.title) || dL(qi.data.title);
                                            (void 0 === qi.data.info && null === qi.data.info) || (dC(qi.data.info), q0(qi.data.info));
                                            (void 0 === qi.data.ems && null === qi.data.ems) || q7(qi.data.ems);
                                            (void 0 === qi.data.persons && null === qi.data.persons) || qP(qi.data.persons);
                                            df(false);
                                          })
                                        );
                                        var qA;
                                      },
                                      id: qZ.id,
                                      className: 'component-paper cursor-pointer',
                                      style: {
                                        width: '100%',
                                        borderBottom: '0px solid #fff',
                                        borderRadius: '0px',
                                        backgroundColor: '#222831',
                                      },
                                      children: Object(PZ.jsx)('div', {
                                        className: 'main-container',
                                        children: Object(PZ.jsx)('div', {
                                          className: 'details',
                                          children: Object(PZ.jsxs)('div', {
                                            className: 'description',
                                            children: [
                                              Object(PZ.jsx)('div', {
                                                className: 'flex-row',
                                                children: Object(PZ.jsx)(Pk.a, {
                                                  style: {
                                                    color: '#fff',
                                                    wordBreak: 'break-word',
                                                  },
                                                  variant: 'body2',
                                                  gutterBottom: true,
                                                  children: qZ.title,
                                                }),
                                              }),
                                              Object(PZ.jsxs)('div', {
                                                className: 'flex-row',
                                                style: {
                                                  justifyContent: 'space-between',
                                                },
                                                children: [
                                                  Object(PZ.jsxs)(Pk.a, {
                                                    style: {
                                                      color: '#fff',
                                                      wordBreak: 'break-word',
                                                    },
                                                    variant: 'body2',
                                                    gutterBottom: true,
                                                    children: ['ID: ', qZ.id],
                                                  }),
                                                  Object(PZ.jsxs)(Pk.a, {
                                                    style: {
                                                      color: '#fff',
                                                      wordBreak: 'break-word',
                                                    },
                                                    variant: 'body2',
                                                    gutterBottom: true,
                                                    children: [qZ.author, ' \u2500 ', Pu()(1000 * qZ.unix).fromNow()],
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                        }),
                                      }),
                                    },
                                    qZ.id,
                                  );
                                })
                              : Object(PZ.jsx)(PZ.Fragment, {}),
                            Object(PZ.jsx)('div', {
                              className: 'spinner-wrapper',
                              style: {
                                display: dx ? '' : 'none',
                                alignItems: 'baseline',
                                marginTop: '15%',
                              },
                              children: Object(PZ.jsxs)('div', {
                                className: 'lds-spinner',
                                children: [
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                ],
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    Object(PZ.jsx)('div', {
                      className: dq.mdwInnerContentDivider,
                    }),
                    Object(PZ.jsxs)('div', {
                      className: dq.mdwIncidentsContentWrapperRight,
                      style: { overflowY: 'auto' },
                      children: [
                        Object(PZ.jsxs)('div', {
                          className: dq.mdwIncidentsTextContentMiddle,
                          children: [
                            Object(PZ.jsxs)('div', {
                              className: dq.mdwIncidentsInnerContentMiddleHeader,
                              children: [
                                Object(PZ.jsx)('div', {
                                  className: 'mdw-incidents-inner-content-middle-header-text-left',
                                  children: Object(PZ.jsx)(Pk.a, {
                                    style: {
                                      color: '#fff',
                                      wordBreak: 'break-word',
                                    },
                                    variant: 'h6',
                                    gutterBottom: true,
                                    children: 0 !== dc ? 'Edit Incident (#'.concat(dc, ')') : 'Create Incident',
                                  }),
                                }),
                                Object(PZ.jsx)('div', {
                                  className: dq.mdwIncidentsInnerContentMiddleHeaderTextRight,
                                  style: { paddingRight: '0px' },
                                  children: Object(PZ.jsxs)(KZ.a, {
                                    direction: 'row',
                                    spacing: 1,
                                    children: [
                                      Object(PZ.jsx)('div', {
                                        children: Object(PZ.jsx)(Pf.a, {
                                          title: 'Create New Incident',
                                          placement: 'top',
                                          sx: {
                                            backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                          },
                                          arrow: true,
                                          children: Object(PZ.jsx)('i', {
                                            onClick: function () {
                                              dV([]);
                                              dJ(0);
                                              dL('');
                                              dC(
                                                '**EMS Report** \n' +
                                                  Pu()().format('YYYY-MM-DD HH:MM:SS') +
                                                  '\n **Reporting EMS** \n @' +
                                                  dE +
                                                  ' ' +
                                                  dr +
                                                  ' ' +
                                                  dh +
                                                  ' ' +
                                                  dS +
                                                  '\n **Assisting Officer/s:** \n **Attending:** \n **Debrief:**',
                                              );
                                              q0(
                                                '**EMS Report** \n' +
                                                  Pu()().format('YYYY-MM-DD HH:MM:SS') +
                                                  '\n **Reporting EMS** \n @' +
                                                  dE +
                                                  ' ' +
                                                  dr +
                                                  ' ' +
                                                  dh +
                                                  ' ' +
                                                  dS +
                                                  '\n **Assisting Officer/s:** \n **Attending:** \n **Debrief:**',
                                              );
                                              q7([]);
                                              qP([]);
                                            },
                                            className: 'fas fa-file-alt fa-w-14',
                                            style: {
                                              display: 0 !== dc ? '' : 'none',
                                              color: '#fff',
                                            },
                                          }),
                                        }),
                                      }),
                                      Object(PZ.jsx)('div', {
                                        children: Object(PZ.jsx)(Pf.a, {
                                          title: 'Save Incident',
                                          placement: 'top',
                                          sx: {
                                            backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                          },
                                          arrow: true,
                                          children: Object(PZ.jsx)('i', {
                                            onClick: function () {
                                              return (
                                                (qx = 0 === dc),
                                                df(true),
                                                void (qx
                                                  ? KS('ev-mdw:saveIncidentEms', {
                                                      id: 0,
                                                      title: dD,
                                                      info: dW,
                                                      shouldCreate: qx,
                                                    }).then(function (qm) {
                                                      (void 0 === qm.data.incident.data && null === qm.data.incident.data) || dV(qm.data.incident.data);
                                                      (void 0 === qm.data.incident.id && null === qm.data.incident.id) || dJ(qm.data.incident.id);
                                                      (void 0 === qm.data.incident.title && null === qm.data.incident.title) || dL(qm.data.incident.title);
                                                      (void 0 === qm.data.incident.info && null === qm.data.incident.info) || dC(qm.data.incident.info);
                                                      (void 0 === qm.data.incident.ems && null === qm.data.incident.ems) || q7(qm.data.incident.ems);
                                                      (void 0 === qm.data.incident.persons && null === qm.data.incident.persons) || qP(qm.data.incident.persons);
                                                      dw(qm.data.incidents);
                                                      dG(qm.data.incidents);
                                                      df(false);
                                                    })
                                                  : KS('ev-mdw:saveIncidentEms', {
                                                      id: dc,
                                                      title: dD,
                                                      info: dW,
                                                      evidence: q3,
                                                      ems: q6,
                                                      persons: qK,
                                                      shouldCreate: qx,
                                                    }).then(function (qm) {
                                                      df(false);
                                                      dw(qm.data.incidents);
                                                      dG(qm.data.incidents);
                                                    }))
                                              );
                                              var qx;
                                            },
                                            className: 'fas fa-save fa-w-14',
                                            style: { color: '#fff' },
                                          }),
                                        }),
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            }),
                            Object(PZ.jsx)('div', {
                              className: 'mdw-inner-content-pre-wrapper',
                              style: {
                                display: 'flex',
                                flexDirection: 'column',
                              },
                              children: Object(PZ.jsx)('div', {
                                className: dq.mdwIncidentsInnerContentMiddleBody,
                                style: { flexDirection: 'row' },
                                children: Object(PZ.jsx)('div', {
                                  className: 'mdw-create-inputs',
                                  style: { width: '100%' },
                                  children: Object(PZ.jsx)('div', {
                                    className: 'input-wrapper',
                                    style: { marginBottom: '2.5%' },
                                    children: Object(PZ.jsx)(Kk.a, {
                                      fullWidth: true,
                                      sx: { width: '100%' },
                                      children: Object(PZ.jsx)(KB.a, {
                                        sx: {
                                          '& .MuiInput-root': {
                                            color: 'white !important',
                                          },
                                          '& label.Mui-focused': {
                                            color: 'darkgray !important',
                                          },
                                          '& Mui-focused': {
                                            color: 'darkgray !important',
                                          },
                                          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                            borderColor: 'darkgray !important',
                                          },
                                          '& .MuiInput-underline:before': {
                                            borderColor: 'darkgray !important',
                                            color: 'darkgray !important',
                                          },
                                          '& .MuiInput-underline:after': {
                                            borderColor: 'white !important',
                                            color: 'darkgray !important',
                                          },
                                          '& .Mui-focused:after': {
                                            color: 'darkgray !important',
                                          },
                                          '& .MuiInputAdornment-root': {
                                            color: 'darkgray !important',
                                          },
                                        },
                                        id: 'input-with-icon-textfield',
                                        label: 'Title',
                                        variant: 'standard',
                                        onChange: function (qZ) {
                                          return dL(qZ.target.value);
                                        },
                                        value: dD,
                                        InputProps: {
                                          startAdornment: Object(PZ.jsx)(KE.a, {
                                            position: 'start',
                                            children: Object(PZ.jsx)('i', {
                                              className: 'fas fa-pen fa-w-16 fa-fw',
                                            }),
                                          }),
                                        },
                                      }),
                                    }),
                                  }),
                                }),
                              }),
                            }),
                            Object(PZ.jsx)('div', {
                              className: 'mdw-create-document',
                              style: {
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                color: '#fff',
                              },
                              children: Object(PZ.jsx)('div', {
                                className: 'mdw-creat-document-inner-cont',
                                style: {
                                  width: '97%',
                                  height: '99%',
                                },
                                children: Object(PZ.jsx)(Pn.a, {
                                  dark: true,
                                  onChange: function (qZ) {
                                    var qx = qZ();
                                    q0(qx);
                                  },
                                  value: dO,
                                  disableExtensions: [
                                    'code_inline',
                                    'link',
                                    'ordered_list',
                                    'checkbox_item',
                                    'checkbox_list',
                                    'image',
                                    'placeholder',
                                    'container_notice',
                                    'table',
                                    'emoji',
                                    'td',
                                    'th',
                                    'tr',
                                    'hr',
                                    'code_fence',
                                    'code_block',
                                  ],
                                }),
                              }),
                            }),
                          ],
                        }),
                        Object(PZ.jsxs)('div', {
                          className: dq.mdwIncidentsEmsInvolvedContentMiddle,
                          children: [
                            Object(PZ.jsxs)('div', {
                              className: dq.mdwIncidentsInnerContentRightHeader,
                              style: {
                                display: 'flex',
                                width: '100%',
                                padding: '8px',
                                minHeight: '48px',
                                justifyContent: 'space-between',
                              },
                              children: [
                                Object(PZ.jsx)('div', {
                                  className: 'mdw-incidents-inner-content-right-header-text-left',
                                  children: Object(PZ.jsx)(Pk.a, {
                                    style: {
                                      color: '#fff',
                                      wordBreak: 'break-word',
                                    },
                                    variant: 'h6',
                                    gutterBottom: true,
                                    children: 'EMS Involved',
                                  }),
                                }),
                                Object(PZ.jsx)('div', {
                                  className: dq.mdwIncidentsInnerContentRightHeaderTextRight,
                                  style: { paddingRight: '0px' },
                                  children: Object(PZ.jsx)(KZ.a, {
                                    direction: 'row',
                                    spacing: 1,
                                    children: Object(PZ.jsx)('div', {
                                      children: Object(PZ.jsx)(Pf.a, {
                                        title: 'Add EMS Involved',
                                        placement: 'top',
                                        sx: {
                                          backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                        },
                                        arrow: true,
                                        children: Object(PZ.jsx)('i', {
                                          onClick: function () {
                                            qg(true);
                                            qk(true);
                                            KS('ev-mdw:fetchEms', {}).then(function (qx) {
                                              qg(false);
                                              qU(qx.data);
                                              qX(qx.data);
                                            });
                                          },
                                          className: 'fas fa-plus fa-w-14',
                                          style: {
                                            display: 0 !== dc ? '' : 'none',
                                            color: '#fff',
                                          },
                                        }),
                                      }),
                                    }),
                                  }),
                                }),
                              ],
                            }),
                            Object(PZ.jsx)('div', {
                              className: dq.mdwIncidentsInnerContentMiddleBody,
                              style: {
                                display: 0 !== dc ? '' : 'none',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                flex: '0',
                                overflowY: 'unset',
                              },
                              children:
                                q6 && q6.length > 0
                                  ? q6.map(function (qZ) {
                                      return Object(PZ.jsx)('div', {
                                        style: {
                                          paddingRight: '1.5%',
                                          paddingBottom: '1.5%',
                                        },
                                        children: Object(PZ.jsx)(KA.a, {
                                          label: '('.concat(qZ.callsign, ') ').concat(qZ.name),
                                          onDelete: function () {
                                            return (function (qm) {
                                              df(true);
                                              var qf = q6.filter(function (qM) {
                                                return qM.cid.toString() !== qm.toString();
                                              });
                                              KS('ev-mdw:updateIncidentEms', {
                                                id: dc,
                                                value: qf,
                                                type: 'ems',
                                                add: false,
                                              }).then(function (qM) {
                                                df(false);
                                                q7(qf);
                                              });
                                            })(qZ.cid);
                                          },
                                          sx: {
                                            backgroundColor: '#fff',
                                            color: '#000',
                                            '& .MuiChip-deleteIcon': {
                                              color: '#000',
                                            },
                                            '& .MuiChip-deleteIcon:hover': {
                                              color: 'rgba(0, 0, 0, 0.5)',
                                            },
                                          },
                                        }),
                                      });
                                    })
                                  : Object(PZ.jsx)(PZ.Fragment, {}),
                            }),
                          ],
                        }),
                        Object(PZ.jsxs)('div', {
                          className: dq.mdwIncidentsPersonsInvolvedContentMiddle,
                          children: [
                            Object(PZ.jsxs)('div', {
                              className: dq.mdwIncidentsInnerContentRightHeader,
                              style: {
                                display: 'flex',
                                width: '100%',
                                padding: '8px',
                                minHeight: '48px',
                                justifyContent: 'space-between',
                              },
                              children: [
                                Object(PZ.jsx)('div', {
                                  className: 'mdw-incidents-inner-content-right-header-text-left',
                                  children: Object(PZ.jsx)(Pk.a, {
                                    style: {
                                      color: '#fff',
                                      wordBreak: 'break-word',
                                    },
                                    variant: 'h6',
                                    gutterBottom: true,
                                    children: 'Persons Involved',
                                  }),
                                }),
                                Object(PZ.jsx)('div', {
                                  className: dq.mdwIncidentsInnerContentRightHeaderTextRight,
                                  style: { paddingRight: '0px' },
                                  children: Object(PZ.jsx)(KZ.a, {
                                    direction: 'row',
                                    spacing: 1,
                                    children: Object(PZ.jsx)('div', {
                                      children: Object(PZ.jsx)(Pf.a, {
                                        title: 'Add Person Involved',
                                        placement: 'top',
                                        sx: {
                                          backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                        },
                                        arrow: true,
                                        children: Object(PZ.jsx)('i', {
                                          onClick: function () {
                                            qT(true);
                                          },
                                          className: 'fas fa-plus fa-w-14',
                                          style: {
                                            display: 0 !== dc ? '' : 'none',
                                            color: '#fff',
                                          },
                                        }),
                                      }),
                                    }),
                                  }),
                                }),
                              ],
                            }),
                            Object(PZ.jsx)('div', {
                              className: dq.mdwIncidentsInnerContentMiddleBody,
                              style: {
                                display: 0 !== dc ? '' : 'none',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                flex: '0',
                                overflowY: 'unset',
                              },
                              children:
                                qK && qK.length > 0
                                  ? qK.map(function (qZ) {
                                      return Object(PZ.jsx)('div', {
                                        style: {
                                          paddingRight: '1.5%',
                                          paddingBottom: '1.5%',
                                        },
                                        children: Object(PZ.jsx)(KA.a, {
                                          label: ''.concat(qZ.name),
                                          onDelete: function () {
                                            return (function (qm) {
                                              var qi = qK.filter(function (qf) {
                                                return qf.cid.toString() !== qm.toString();
                                              });
                                              KS('ev-mdw:updateIncidentEms', {
                                                id: dc,
                                                value: qi,
                                                type: 'persons',
                                              }).then(function (qf) {
                                                qP(qi);
                                              });
                                            })(qZ.cid);
                                          },
                                          sx: {
                                            backgroundColor: '#fff',
                                            color: '#000',
                                            '& .MuiChip-deleteIcon': {
                                              color: '#000',
                                            },
                                            '& .MuiChip-deleteIcon:hover': {
                                              color: 'rgba(0, 0, 0, 0.5)',
                                            },
                                          },
                                        }),
                                      });
                                    })
                                  : Object(PZ.jsx)(PZ.Fragment, {}),
                            }),
                          ],
                        }),
                      ],
                    }),
                    Object(PZ.jsx)('div', {
                      className: dq.mdwInnerContentDivider,
                    }),
                    Object(PZ.jsx)('div', {
                      className: dq.mdwIncidentsContentWrapperRight,
                      style: { overflowY: 'auto' },
                    }),
                  ],
                }),
              }),
            })
          );
        },
        PL = Object(PB.a)({
          mdwProfilesOuterContent: {
            width: '90%',
            height: '100%',
            padding: '8px',
          },
          mdwProfilesInnerContent: {
            width: '100%',
            height: '100%',
            display: 'flex',
          },
          mdwProfilesInnerContentLeft: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwProfilesInnerContentLeftHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwProfilesInnerContentMiddle: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwProfilesInnerContentMiddleHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwProfilesInnerContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwProfilesInnerContentRightHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwProfilesInnerContentRightHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwCreateImage: { marginRight: '8px' },
          mdwProfilesContentWrapperRight: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
          mdwProfilesLicensesContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwProfilesTagsContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwProfilesVehiclesContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwProfilesHousingContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwProfilesHotelsContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwProfilesStorageContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwProfilesEmploymentContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwProfilesPriorsContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwProfilesInnerContentLeftHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwProfilesInnerContentLeftBody: {
            flex: '1 1 0%',
            width: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwInnerContentDivider: { width: '16px' },
          mdwProfilesInnerContentMiddleHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwProfilesInnerContentMiddleBody: {
            flex: '1 1 0%',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwProfilesInnerContentRightBody: {
            flex: '1 1 0%',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          checkbox: {
            '&:hover': { backgroundColor: 'transparent !important' },
          },
          mdwAssignLicenseModalContainer: {
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            display: 'flex',
            zIndex: '1000',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          mdwAssignLicenseModalInnerContainer: {
            width: 'calc(23% - 64px)',
            height: 'auto',
            display: 'flex',
            overflow: 'hidden scroll',
            position: 'relative',
            maxHeight: '80%',
            minHeight: '22%',
            backgroundColor: 'rgb(34, 40, 49)',
          },
        }),
        PR = function () {
          var dq = PL(),
            dU = Object(Kb.c)(KM),
            dQ = Object(KK.a)(dU, 2),
            dh = dQ[0],
            dX = (dQ[1], Object(K4.useState)(false)),
            dI = Object(KK.a)(dX, 2),
            dS = dI[0],
            dg = dI[1],
            dj = Object(Kb.c)(Kw),
            dr = Object(KK.a)(dj, 2),
            dk = (dr[0], dr[1]),
            dB = Object(K4.useState)([]),
            dE = Object(KK.a)(dB, 2),
            dT = dE[0],
            dZ = dE[1],
            dx = Object(Kb.c)(Kv),
            dA = Object(KK.a)(dx, 2),
            dm = (dA[0], dA[1]),
            di = Object(K4.useState)({}),
            df = Object(KK.a)(di, 2),
            db = df[0],
            dM = df[1],
            dv = Object(Kb.c)(Ko),
            dw = Object(KK.a)(dv, 2),
            du = dw[0],
            da = dw[1],
            dH = Object(K4.useState)({}),
            dG = Object(KK.a)(dH, 2),
            dy = (dG[0], dG[1]),
            dp = Object(K4.useState)({}),
            dV = Object(KK.a)(dp, 2),
            dn = dV[0],
            dF = dV[1],
            dc = Object(K4.useState)({}),
            dJ = Object(KK.a)(dc, 2),
            dl = dJ[0],
            dY = dJ[1],
            dD = Object(K4.useState)({}),
            dL = Object(KK.a)(dD, 2),
            dR = dL[0],
            ds = dL[1],
            dO = Object(K4.useState)({}),
            dC = Object(KK.a)(dO, 2),
            dz = dC[0],
            dN = dC[1],
            dW = Object(K4.useState)({}),
            q0 = Object(KK.a)(dW, 2),
            q1 = q0[0],
            q2 = q0[1],
            q3 = Object(K4.useState)(''),
            q4 = Object(KK.a)(q3, 2),
            q5 = q4[0],
            q6 = q4[1],
            q7 = Object(K4.useState)(''),
            q8 = Object(KK.a)(q7, 2),
            q9 = q8[0],
            qK = q8[1],
            qP = Object(K4.useState)(''),
            qd = Object(KK.a)(qP, 2),
            qq = qd[0],
            qU = qd[1],
            qQ = Object(Kb.c)(KH),
            qh = Object(KK.a)(qQ, 2),
            qX = qh[0],
            qI = qh[1],
            qS = Object(K4.useState)(''),
            qg = Object(KK.a)(qS, 2),
            qj = qg[0],
            qr = qg[1],
            qk = Object(Kb.c)(Pr),
            qB = Object(KK.a)(qk, 2),
            qE = qB[0];
          qB[1];
          Object(K4.useEffect)(function () {
            Kq() || (dM([]), da([]), dy([]), dF([]), dY([]), dN([]), q2([]), q6(''), qr(''), qK(''), qU(''), qI(''));
          }, []);
          var qT = function (qZ) {
            dm(true);
            KS('ev-mdw:loadProfile', { value: qZ }).then(function (qA) {
              dg(false);
              dM(qA.data.profile);
              da(qA.data.licenses);
              dF(qA.data.vehicles);
              dY(qA.data.housing);
              ds(qA.data.storages);
              dN(qA.data.employment);
              q2(qA.data.priors);
              q6('');
              qK('');
              qU('');
              qI('');
              (void 0 !== qA.data.profile.first_name || (null !== qA.data.profile.first_name && void 0 !== qA.data.profile.last_name) || null !== qA.data.profile.last_name) &&
                qK(''.concat(qA.data.profile.first_name, ' ').concat(qA.data.profile.last_name, ' '));
              (void 0 === qA.data.profile.profilepic && null === qA.data.profile.profilepic) || qU(qA.data.profile.profilepic);
              (void 0 === qA.data.profile.id && null === qA.data.profile.id) || qI(qA.data.profile.id);
              (void 0 === qA.data.profile.information && null === qA.data.profile.information) || q6(qA.data.profile.information);
              dm(false);
            });
          };
          return Object(PZ.jsx)(PZ.Fragment, {
            children: Object(PZ.jsx)('div', {
              className: dq.mdwProfilesOuterContent,
              children: Object(PZ.jsxs)('div', {
                className: dq.mdwProfilesInnerContent,
                children: [
                  Object(PZ.jsxs)('div', {
                    className: dq.mdwProfilesInnerContentLeft,
                    children: [
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwProfilesInnerContentLeftHeader,
                        children: [
                          Object(PZ.jsx)('div', {
                            className: 'mdw-profiles-inner-content-left-header-text-left',
                            children: Object(PZ.jsx)(Pk.a, {
                              style: {
                                color: '#fff',
                                wordBreak: 'break-word',
                              },
                              variant: 'h6',
                              gutterBottom: true,
                              children: 'Profiles',
                            }),
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwProfilesInnerContentLeftHeaderTextRight,
                            children: Object(PZ.jsx)('div', {
                              className: 'input-wrapper',
                              children: Object(PZ.jsx)(Kk.a, {
                                fullWidth: true,
                                sx: { width: '100%' },
                                children: Object(PZ.jsx)(KB.a, {
                                  sx: {
                                    '& .MuiInput-root': {
                                      color: 'white !important',
                                    },
                                    '& label.Mui-focused': {
                                      color: 'darkgray !important',
                                    },
                                    '& Mui-focused': {
                                      color: 'darkgray !important',
                                    },
                                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderColor: 'darkgray !important' },
                                    '& .MuiInput-underline:before': {
                                      borderColor: 'darkgray !important',
                                      color: 'darkgray !important',
                                    },
                                    '& .MuiInput-underline:after': {
                                      borderColor: 'white !important',
                                      color: 'darkgray !important',
                                    },
                                    '& .Mui-focused:after': {
                                      color: 'darkgray !important',
                                    },
                                    '& .MuiInputAdornment-root': {
                                      color: 'darkgray !important',
                                    },
                                  },
                                  id: 'input-with-icon-textfield',
                                  label: 'Search',
                                  variant: 'standard',
                                  onChange: function (qZ) {
                                    return (function (qA) {
                                      if ('' === qA || void 0 === qA) {
                                        return dg(false), void dZ([]);
                                      }
                                      dZ([]);
                                      dg(true);
                                      KS('ev-mdw:searchProfiles', {
                                        value: qA,
                                      }).then(function (qi) {
                                        dg(false);
                                        dZ(qi.data);
                                      });
                                    })(qZ.target.value);
                                  },
                                  InputProps: {
                                    startAdornment: Object(PZ.jsx)(KE.a, {
                                      position: 'start',
                                      children: Object(PZ.jsx)('i', {
                                        className: 'fas fa-search fa-w-16 fa-fw',
                                      }),
                                    }),
                                  },
                                }),
                              }),
                            }),
                          }),
                        ],
                      }),
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwProfilesInnerContentLeftBody,
                        children: [
                          dT && dT.length > 0
                            ? dT.map(function (qZ) {
                                return Object(PZ.jsx)(PZ.Fragment, {
                                  children: Object(PZ.jsx)(
                                    'div',
                                    {
                                      onClick: function () {
                                        return qT(qZ.id);
                                      },
                                      id: qZ.id,
                                      className: 'component-paper cursor-pointer',
                                      style: {
                                        width: '100%',
                                        borderBottom: '0px solid #fff',
                                        borderRadius: '0px',
                                        backgroundColor: '#222831',
                                      },
                                      children: Object(PZ.jsx)('div', {
                                        className: 'main-container',
                                        children: Object(PZ.jsx)('div', {
                                          className: 'details',
                                          children: Object(PZ.jsxs)('div', {
                                            className: 'description',
                                            children: [
                                              Object(PZ.jsx)('div', {
                                                className: 'flex-row',
                                                children: Object(PZ.jsxs)(Pk.a, {
                                                  style: {
                                                    color: '#fff',
                                                    wordBreak: 'break-word',
                                                  },
                                                  variant: 'body2',
                                                  gutterBottom: true,
                                                  children: [qZ.first_name, ' ', qZ.last_name],
                                                }),
                                              }),
                                              Object(PZ.jsx)('div', {
                                                className: 'flex-row',
                                                children: Object(PZ.jsxs)(Pk.a, {
                                                  style: {
                                                    color: '#fff',
                                                    wordBreak: 'break-word',
                                                  },
                                                  variant: 'body2',
                                                  gutterBottom: true,
                                                  children: ['ID: ', qZ.id],
                                                }),
                                              }),
                                            ],
                                          }),
                                        }),
                                      }),
                                    },
                                    qZ.id,
                                  ),
                                });
                              })
                            : Object(PZ.jsx)(PZ.Fragment, {}),
                          Object(PZ.jsx)('div', {
                            className: 'spinner-wrapper',
                            style: {
                              display: dS ? '' : 'none',
                              alignItems: 'baseline',
                              marginTop: '15%',
                            },
                            children: Object(PZ.jsxs)('div', {
                              className: 'lds-spinner',
                              children: [
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                              ],
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  Object(PZ.jsx)('div', {
                    className: dq.mdwInnerContentDivider,
                  }),
                  Object(PZ.jsxs)('div', {
                    className: dq.mdwProfilesInnerContentMiddle,
                    children: [
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwProfilesInnerContentMiddleHeader,
                        children: [
                          Object(PZ.jsx)('div', {
                            className: 'mdw-profiles-inner-content-middle-header-text-left',
                            children: Object(PZ.jsx)(Pk.a, {
                              style: {
                                color: '#fff',
                                wordBreak: 'break-word',
                              },
                              variant: 'h6',
                              gutterBottom: true,
                              children: void 0 === db.id || dh ? (dh ? 'Profile' : 'Create Profile') : 'Edit Profile (#'.concat(db.id, ')'),
                            }),
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwProfilesInnerContentMiddleHeaderTextRight,
                            style: { paddingRight: '0px' },
                            children: Object(PZ.jsxs)(KZ.a, {
                              direction: 'row',
                              spacing: 1,
                              children: [
                                Object(PZ.jsx)('div', {
                                  children: Object(PZ.jsx)(Pf.a, {
                                    title: 'Create New Profile',
                                    placement: 'top',
                                    sx: {
                                      backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                    },
                                    arrow: true,
                                    children: Object(PZ.jsx)('i', {
                                      onClick: function () {
                                        dM([]), da([]), dy([]), dF([]), dY([]), dN([]), q2([]), q6(''), qr(''), qK(''), qU(''), qI('');
                                      },
                                      className: 'fas fa-file-alt fa-w-14',
                                      style: {
                                        display: void 0 === db.id || dh ? 'none' : '',
                                        color: '#fff',
                                      },
                                    }),
                                  }),
                                }),
                                Object(PZ.jsx)('div', {
                                  children: Object(PZ.jsx)(Pf.a, {
                                    title: 'Save Profile',
                                    placement: 'top',
                                    sx: {
                                      backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                    },
                                    arrow: true,
                                    children: Object(PZ.jsx)('i', {
                                      onClick: function () {
                                        void 0 === db.id ||
                                          (dm(true),
                                          KS('ev-mdw:editProfile', {
                                            id: qX,
                                            name: q9,
                                            image: qq,
                                            info: qj,
                                          }).then(function (qx) {
                                            dg(false);
                                            dM(qx.data.profile);
                                            da(qx.data.licenses);
                                            dF(qx.data.vehicles);
                                            dY(qx.data.housing);
                                            dN(qx.data.employment);
                                            q2(qx.data.priors);
                                            q6('');
                                            qK('');
                                            qU('');
                                            qI('');
                                            (void 0 !== qx.data.profile.first_name ||
                                              (null !== qx.data.profile.first_name && void 0 !== qx.data.profile.last_name) ||
                                              null !== qx.data.profile.last_name) &&
                                              qK(''.concat(qx.data.profile.first_name, ' ').concat(qx.data.profile.last_name, ' '));
                                            (void 0 === qx.data.profile.profilepic && null === qx.data.profile.profilepic) || qU(qx.data.profile.profilepic);
                                            (void 0 === qx.data.profile.id && null === qx.data.profile.id) || qI(qx.data.profile.id);
                                            (void 0 === qx.data.profile.information && null === qx.data.profile.information) || q6(qx.data.profile.information);
                                            dm(false);
                                          }));
                                      },
                                      className: 'fas fa-save fa-w-14',
                                      style: {
                                        display: dh ? 'none' : '',
                                        color: '#fff',
                                      },
                                    }),
                                  }),
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                      Object(PZ.jsx)('div', {
                        className: 'mdw-inner-content-pre-wrapper',
                        style: {
                          display: 'flex',
                          flexDirection: 'column',
                        },
                        children: Object(PZ.jsxs)('div', {
                          className: dq.mdwProfilesInnerContentMiddleBody,
                          style: { flexDirection: 'row' },
                          children: [
                            Object(PZ.jsx)('div', {
                              className: dq.mdwCreateImage,
                              children: Object(PZ.jsx)('img', {
                                alt: '',
                                src: (db.length > 0 && null !== db.profilepic) || void 0 !== db.profilepic ? ''.concat(db.profilepic) : 'https://i.imgur.com/wxNT3y2.jpg',
                                style: {
                                  height: '163px',
                                  width: '185px',
                                },
                              }),
                            }),
                            Object(PZ.jsxs)('div', {
                              className: 'mdw-create-inputs',
                              style: { width: '85%' },
                              children: [
                                Object(PZ.jsx)('div', {
                                  className: 'input-wrapper',
                                  style: { marginBottom: '2.5%' },
                                  children: Object(PZ.jsx)(Kk.a, {
                                    fullWidth: true,
                                    sx: { width: '100%' },
                                    children: Object(PZ.jsx)(KB.a, {
                                      sx: {
                                        '& .MuiInput-root': {
                                          color: 'white !important',
                                        },
                                        '& label.Mui-focused': {
                                          color: 'darkgray !important',
                                        },
                                        '& Mui-focused': {
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                          borderColor: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:before': {
                                          borderColor: 'darkgray !important',
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:after': {
                                          borderColor: 'white !important',
                                          color: 'darkgray !important',
                                        },
                                        '& .Mui-focused:after': {
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInputAdornment-root': {
                                          color: 'darkgray !important',
                                        },
                                      },
                                      id: 'input-with-icon-textfield',
                                      label: 'State ID',
                                      variant: 'standard',
                                      value: qX,
                                      InputProps: {
                                        readOnly: true,
                                        startAdornment: Object(PZ.jsx)(KE.a, {
                                          position: 'start',
                                          children: Object(PZ.jsx)('i', {
                                            className: 'fas fa-id-card fa-w-16 fa-fw',
                                          }),
                                        }),
                                      },
                                    }),
                                  }),
                                }),
                                Object(PZ.jsx)('div', {
                                  className: 'input-wrapper',
                                  style: { marginBottom: '2.5%' },
                                  children: Object(PZ.jsx)(Kk.a, {
                                    fullWidth: true,
                                    sx: { width: '100%' },
                                    children: Object(PZ.jsx)(KB.a, {
                                      sx: {
                                        '& .MuiInput-root': {
                                          color: 'white !important',
                                        },
                                        '& label.Mui-focused': {
                                          color: 'darkgray !important',
                                        },
                                        '& Mui-focused': {
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                          borderColor: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:before': {
                                          borderColor: 'darkgray !important',
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:after': {
                                          borderColor: 'white !important',
                                          color: 'darkgray !important',
                                        },
                                        '& .Mui-focused:after': {
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInputAdornment-root': {
                                          color: 'darkgray !important',
                                        },
                                      },
                                      id: 'input-with-icon-textfield',
                                      label: 'Name',
                                      variant: 'standard',
                                      value: q9,
                                      InputProps: {
                                        readOnly: true,
                                        startAdornment: Object(PZ.jsx)(KE.a, {
                                          position: 'start',
                                          children: Object(PZ.jsx)('i', {
                                            className: 'fas fa-user fa-w-16 fa-fw',
                                          }),
                                        }),
                                      },
                                    }),
                                  }),
                                }),
                                Object(PZ.jsx)('div', {
                                  className: 'input-wrapper',
                                  style: {
                                    marginBottom: '2.5%',
                                    display: dh ? 'none' : '',
                                  },
                                  children: Object(PZ.jsx)(Kk.a, {
                                    fullWidth: true,
                                    sx: { width: '100%' },
                                    children: Object(PZ.jsx)(KB.a, {
                                      sx: {
                                        '& .MuiInput-root': {
                                          color: 'white !important',
                                        },
                                        '& label.Mui-focused': {
                                          color: 'darkgray !important',
                                        },
                                        '& Mui-focused': {
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                          borderColor: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:before': {
                                          borderColor: 'darkgray !important',
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:after': {
                                          borderColor: 'white !important',
                                          color: 'darkgray !important',
                                        },
                                        '& .Mui-focused:after': {
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInputAdornment-root': {
                                          color: 'darkgray !important',
                                        },
                                      },
                                      id: 'input-with-icon-textfield',
                                      label: 'Profile Image URL',
                                      variant: 'standard',
                                      value: qq,
                                      onChange: function (qZ) {
                                        return qU(qZ.target.value);
                                      },
                                      InputProps: {
                                        readOnly: dh || 'ems' === qE,
                                        startAdornment: Object(PZ.jsx)(KE.a, {
                                          position: 'start',
                                          children: Object(PZ.jsx)('i', {
                                            className: 'fas fa-clipboard fa-w-16 fa-fw',
                                          }),
                                        }),
                                      },
                                    }),
                                  }),
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                      Object(PZ.jsx)('div', {
                        className: 'mdw-create-document',
                        style: {
                          display: dh ? 'none' : 'flex',
                          width: '100%',
                          height: '100%',
                          justifyContent: 'center',
                          color: '#fff',
                        },
                        children: Object(PZ.jsx)('div', {
                          className: 'mdw-creat-document-inner-cont',
                          style: {
                            width: '97%',
                            height: '99%',
                          },
                          children: Object(PZ.jsx)(Pn.a, {
                            placeholder: 'Document content goes here...',
                            dark: true,
                            onChange: function (qZ) {
                              var qx = qZ();
                              qr(qx);
                            },
                            value: q5,
                            className: dq.checkbox,
                            disableExtensions: [
                              'code_inline',
                              'link',
                              'ordered_list',
                              'checkbox_item',
                              'checkbox_list',
                              'image',
                              'placeholder',
                              'container_notice',
                              'table',
                              'emoji',
                              'td',
                              'th',
                              'tr',
                              'hr',
                              'code_fence',
                              'code_block',
                            ],
                          }),
                        }),
                      }),
                    ],
                  }),
                  Object(PZ.jsx)('div', {
                    className: dq.mdwInnerContentDivider,
                  }),
                  Object(PZ.jsxs)('div', {
                    className: dq.mdwProfilesContentWrapperRight,
                    style: { overflowY: 'auto' },
                    children: [
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwProfilesLicensesContentRight,
                        children: [
                          Object(PZ.jsxs)('div', {
                            className: dq.mdwProfilesInnerContentRightHeader,
                            style: {
                              display: 'flex',
                              width: '100%',
                              padding: '8px',
                              minHeight: '48px',
                              justifyContent: 'space-between',
                            },
                            children: [
                              Object(PZ.jsx)('div', {
                                className: 'mdw-profiles-inner-content-right-header-text-left',
                                children: Object(PZ.jsx)(Pk.a, {
                                  style: {
                                    color: '#fff',
                                    wordBreak: 'break-word',
                                  },
                                  variant: 'h6',
                                  gutterBottom: true,
                                  children: 'Licenses',
                                }),
                              }),
                              Object(PZ.jsx)('div', {
                                className: dq.mdwProfilesInnerContentRightHeaderTextRight,
                                style: { paddingRight: '0px' },
                                children: Object(PZ.jsx)('div', {
                                  children: Object(PZ.jsx)(Pf.a, {
                                    title: 'Assign License',
                                    placement: 'top',
                                    sx: {
                                      backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                    },
                                    arrow: true,
                                    children: Object(PZ.jsx)('i', {
                                      onClick: function () {
                                        return dk(true);
                                      },
                                      className: 'fas fa-plus fa-w-14',
                                      style: {
                                        display: void 0 === db.id || dh || 'ems' === qE ? 'none' : '',
                                        color: '#fff',
                                      },
                                    }),
                                  }),
                                }),
                              }),
                            ],
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwProfilesInnerContentRightBody,
                            style: {
                              display: du && du.length > 0 ? '' : 'none',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              flex: '0',
                              overflowY: 'unset',
                            },
                            children:
                              du && du.length > 0
                                ? du.map(function (qZ) {
                                    return Object(PZ.jsx)(PZ.Fragment, {
                                      children:
                                        dh || 'ems' === qE
                                          ? Object(PZ.jsx)(PZ.Fragment, {
                                              children: Object(PZ.jsx)('div', {
                                                style: {
                                                  paddingRight: '1.5%',
                                                  paddingBottom: '1.5%',
                                                },
                                                children: Object(PZ.jsx)(KA.a, {
                                                  label: ''.concat(qZ.type, ' License'),
                                                  sx: {
                                                    backgroundColor: '#fff',
                                                    color: '#000',
                                                  },
                                                }),
                                              }),
                                            })
                                          : Object(PZ.jsx)(PZ.Fragment, {
                                              children: Object(PZ.jsx)('div', {
                                                style: {
                                                  paddingRight: '1.5%',
                                                  paddingBottom: '1.5%',
                                                },
                                                children: Object(PZ.jsx)(KA.a, {
                                                  label: ''.concat(qZ.type, ' License'),
                                                  onDelete: function () {
                                                    return (
                                                      (qx = qZ.type),
                                                      void KS('ev-mdw:removeLicense', {
                                                        cid: qX,
                                                        type: qx,
                                                      }).then(function (qA) {
                                                        qT(qX);
                                                      })
                                                    );
                                                    var qx;
                                                  },
                                                  sx: {
                                                    backgroundColor: '#fff',
                                                    color: '#000',
                                                    '& .MuiChip-deleteIcon': {
                                                      color: '#000',
                                                    },
                                                    '& .MuiChip-deleteIcon:hover': {
                                                      color: 'rgba(0, 0, 0, 0.5)',
                                                    },
                                                  },
                                                }),
                                              }),
                                            }),
                                    });
                                  })
                                : Object(PZ.jsx)(PZ.Fragment, {}),
                          }),
                        ],
                      }),
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwProfilesTagsContentRight,
                        children: [
                          Object(PZ.jsxs)('div', {
                            className: dq.mdwProfilesInnerContentRightHeader,
                            style: {
                              display: 'flex',
                              width: '100%',
                              padding: '8px',
                              minHeight: '48px',
                              justifyContent: 'space-between',
                            },
                            children: [
                              Object(PZ.jsx)('div', {
                                className: 'mdw-profiles-inner-content-right-header-text-left',
                                children: Object(PZ.jsx)(Pk.a, {
                                  style: {
                                    color: '#fff',
                                    wordBreak: 'break-word',
                                  },
                                  variant: 'h6',
                                  gutterBottom: true,
                                  children: 'Tags',
                                }),
                              }),
                              Object(PZ.jsx)('div', {
                                className: dq.mdwProfilesInnerContentRightHeaderTextRight,
                                style: { paddingRight: '0px' },
                                children: Object(PZ.jsx)('div', {
                                  children: Object(PZ.jsx)(Pf.a, {
                                    title: 'Add Tag',
                                    placement: 'top',
                                    sx: {
                                      backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                    },
                                    arrow: true,
                                    children: Object(PZ.jsx)('i', {
                                      className: 'fas fa-plus fa-w-14',
                                      style: {
                                        display: void 0 === db.id || dh || 'ems' === qE ? 'none' : '',
                                        color: '#fff',
                                      },
                                    }),
                                  }),
                                }),
                              }),
                            ],
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwProfilesInnerContentRightBody,
                            style: {
                              display: 'none',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              flex: '0',
                              overflowY: 'unset',
                            },
                          }),
                        ],
                      }),
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwProfilesVehiclesContentRight,
                        children: [
                          Object(PZ.jsxs)('div', {
                            className: dq.mdwProfilesInnerContentRightHeader,
                            style: {
                              display: 'flex',
                              width: '100%',
                              padding: '8px',
                              minHeight: '48px',
                              justifyContent: 'space-between',
                            },
                            children: [
                              Object(PZ.jsx)('div', {
                                className: 'mdw-profiles-inner-content-right-header-text-left',
                                children: Object(PZ.jsx)(Pk.a, {
                                  style: {
                                    color: '#fff',
                                    wordBreak: 'break-word',
                                  },
                                  variant: 'h6',
                                  gutterBottom: true,
                                  children: 'Vehicles',
                                }),
                              }),
                              Object(PZ.jsx)('div', {
                                className: dq.mdwProfilesInnerContentRightHeaderTextRight,
                              }),
                            ],
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwProfilesInnerContentRightBody,
                            style: {
                              display: void 0 !== db.id ? '' : 'none',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              flex: '0',
                              overflowY: 'unset',
                            },
                            children:
                              dn && dn.length > 0
                                ? dn.map(function (qZ) {
                                    return Object(PZ.jsx)('div', {
                                      style: {
                                        paddingRight: '1.5%',
                                        paddingBottom: '1.5%',
                                      },
                                      children: Object(PZ.jsx)(KA.a, {
                                        label: ''.concat(qZ.plate, ' - ').concat(qZ.model),
                                        sx: {
                                          backgroundColor: '#fff',
                                          color: '#000',
                                        },
                                      }),
                                    });
                                  })
                                : Object(PZ.jsx)(PZ.Fragment, {}),
                          }),
                        ],
                      }),
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwProfilesHousingContentRight,
                        children: [
                          Object(PZ.jsxs)('div', {
                            className: dq.mdwProfilesInnerContentRightHeader,
                            style: {
                              display: 'flex',
                              width: '100%',
                              padding: '8px',
                              minHeight: '48px',
                              justifyContent: 'space-between',
                            },
                            children: [
                              Object(PZ.jsx)('div', {
                                className: 'mdw-profiles-inner-content-right-header-text-left',
                                children: Object(PZ.jsx)(Pk.a, {
                                  style: {
                                    color: '#fff',
                                    wordBreak: 'break-word',
                                  },
                                  variant: 'h6',
                                  gutterBottom: true,
                                  children: 'Housing',
                                }),
                              }),
                              Object(PZ.jsx)('div', {
                                className: dq.mdwProfilesInnerContentRightHeaderTextRight,
                              }),
                            ],
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwProfilesInnerContentRightBody,
                            style: {
                              display: void 0 !== db.id ? '' : 'none',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              flex: '0',
                              overflowY: 'unset',
                            },
                            children:
                              dl && dl.length > 0
                                ? dl.map(function (qZ) {
                                    return Object(PZ.jsx)('div', {
                                      style: {
                                        paddingRight: '1.5%',
                                        paddingBottom: '1.5%',
                                      },
                                      children: Object(PZ.jsx)(KA.a, {
                                        label: ''.concat(qZ.property_name, ' (').concat(qZ.property_category, ')'),
                                        sx: {
                                          backgroundColor: '#fff',
                                          color: '#000',
                                        },
                                      }),
                                    });
                                  })
                                : Object(PZ.jsx)(PZ.Fragment, {}),
                          }),
                        ],
                      }),
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwProfilesStorageContentRight,
                        children: [
                          Object(PZ.jsxs)('div', {
                            className: dq.mdwProfilesInnerContentRightHeader,
                            style: {
                              display: 'flex',
                              width: '100%',
                              padding: '8px',
                              minHeight: '48px',
                              justifyContent: 'space-between',
                            },
                            children: [
                              Object(PZ.jsx)('div', {
                                className: 'mdw-profiles-inner-content-right-header-text-left',
                                children: Object(PZ.jsx)(Pk.a, {
                                  style: {
                                    color: '#fff',
                                    wordBreak: 'break-word',
                                  },
                                  variant: 'h6',
                                  gutterBottom: true,
                                  children: 'Storage Access',
                                }),
                              }),
                              Object(PZ.jsx)('div', {
                                className: dq.mdwProfilesInnerContentRightHeaderTextRight,
                              }),
                            ],
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwProfilesInnerContentRightBody,
                            style: {
                              display: void 0 !== db.id ? '' : 'none',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              flex: '0',
                              overflowY: 'unset',
                            },
                            children:
                              dR && dR.length > 0
                                ? dR.map(function (qZ) {
                                    return Object(PZ.jsx)('div', {
                                      style: {
                                        paddingRight: '1.5%',
                                        paddingBottom: '1.5%',
                                      },
                                      children: Object(PZ.jsx)(KA.a, {
                                        label: ''.concat(qZ.storage_id),
                                        sx: {
                                          backgroundColor: '#fff',
                                          color: '#000',
                                        },
                                      }),
                                    });
                                  })
                                : Object(PZ.jsx)(PZ.Fragment, {}),
                          }),
                        ],
                      }),
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwProfilesEmploymentContentRight,
                        children: [
                          Object(PZ.jsxs)('div', {
                            className: dq.mdwProfilesInnerContentRightHeader,
                            style: {
                              display: 'flex',
                              width: '100%',
                              padding: '8px',
                              minHeight: '48px',
                              justifyContent: 'space-between',
                            },
                            children: [
                              Object(PZ.jsx)('div', {
                                className: 'mdw-profiles-inner-content-right-header-text-left',
                                children: Object(PZ.jsx)(Pk.a, {
                                  style: {
                                    color: '#fff',
                                    wordBreak: 'break-word',
                                  },
                                  variant: 'h6',
                                  gutterBottom: true,
                                  children: 'Employment',
                                }),
                              }),
                              Object(PZ.jsx)('div', {
                                className: dq.mdwProfilesInnerContentRightHeaderTextRight,
                              }),
                            ],
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwProfilesInnerContentRightBody,
                            style: {
                              display: void 0 !== db.id ? '' : 'none',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              flex: '0',
                              overflowY: 'unset',
                            },
                            children:
                              dz && dz.length > 0
                                ? dz.map(function (qZ) {
                                    return Object(PZ.jsx)('div', {
                                      style: {
                                        paddingRight: '1.5%',
                                        paddingBottom: '1.5%',
                                      },
                                      children: Object(PZ.jsx)(KA.a, {
                                        label: ''.concat(qZ.business_name, ' (').concat(qZ.business_role, ')'),
                                        sx: {
                                          backgroundColor: '#fff',
                                          color: '#000',
                                        },
                                      }),
                                    });
                                  })
                                : Object(PZ.jsx)(PZ.Fragment, {}),
                          }),
                        ],
                      }),
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwProfilesPriorsContentRight,
                        children: [
                          Object(PZ.jsxs)('div', {
                            className: dq.mdwProfilesInnerContentRightHeader,
                            style: {
                              display: 'flex',
                              width: '100%',
                              padding: '8px',
                              minHeight: '48px',
                              justifyContent: 'space-between',
                            },
                            children: [
                              Object(PZ.jsx)('div', {
                                className: 'mdw-profiles-inner-content-right-header-text-left',
                                children: Object(PZ.jsx)(Pk.a, {
                                  style: {
                                    color: '#fff',
                                    wordBreak: 'break-word',
                                  },
                                  variant: 'h6',
                                  gutterBottom: true,
                                  children: 'Priors',
                                }),
                              }),
                              Object(PZ.jsx)('div', {
                                className: dq.mdwProfilesInnerContentRightHeaderTextRight,
                              }),
                            ],
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwProfilesInnerContentRightBody,
                            style: {
                              display: void 0 !== db.id ? '' : 'none',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              flex: '0',
                              overflowY: 'unset',
                            },
                            children:
                              q1 && q1.length > 0
                                ? q1.map(function (qZ) {
                                    return Object(PZ.jsx)('div', {
                                      style: {
                                        paddingRight: '1.5%',
                                        paddingBottom: '1.5%',
                                      },
                                      children: Object(PZ.jsx)(KA.a, {
                                        label: '('.concat(qZ.times, ') ').concat(qZ.charge),
                                        sx: {
                                          backgroundColor: '#fff',
                                          color: '#000',
                                        },
                                      }),
                                    });
                                  })
                                : Object(PZ.jsx)(PZ.Fragment, {}),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          });
        },
        Ps = Object(PB.a)({
          mdwDmvOuterContent: {
            width: '90%',
            height: '100%',
            padding: '8px',
          },
          mdwDmvInnerContent: {
            width: '100%',
            height: '100%',
            display: 'flex',
          },
          mdwDmvInnerContentLeft: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwDmvInnerContentLeftHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwDmvInnerContentMiddle: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwDmvInnerContentMiddleHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwDmvInnerContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwDmvInnerContentRightHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwDmvInnerContentRightHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwCreateImage: { marginRight: '8px' },
          mdwDmvContentWrapperRight: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
          mdwDmvLicensesContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwDmvTagsContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwDmvVehiclesContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwDmvHousingContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwDmvHotelsContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwDmvStorageContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwDmvEmploymentContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwDmvPriorsContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwDmvInnerContentLeftHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwDmvInnerContentLeftBody: {
            flex: '1 1 0%',
            width: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwInnerContentDivider: { width: '16px' },
          mdwDmvInnerContentMiddleHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwDmvInnerContentMiddleBody: {
            flex: '1 1 0%',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwDmvInnerContentRightBody: {
            flex: '1 1 0%',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          checkbox: {
            '&:hover': { backgroundColor: 'transparent !important' },
          },
        }),
        Pt = function () {
          var dq = Ps(),
            dU = Object(K4.useState)(false),
            dQ = Object(KK.a)(dU, 2),
            dh = dQ[0],
            dX = dQ[1],
            dI = Object(K4.useState)([]),
            dS = Object(KK.a)(dI, 2),
            dg = dS[0],
            dj = dS[1],
            dr = Object(Kb.c)(Kv),
            dk = Object(KK.a)(dr, 2),
            dB = (dk[0], dk[1]),
            dE = Object(K4.useState)({}),
            dT = Object(KK.a)(dE, 2),
            dZ = dT[0],
            dx = dT[1],
            dA = Object(K4.useState)(''),
            dm = Object(KK.a)(dA, 2),
            di = dm[0],
            df = dm[1],
            db = Object(K4.useState)(''),
            dM = Object(KK.a)(db, 2),
            dv = dM[0],
            dw = dM[1],
            du = Object(K4.useState)(''),
            da = Object(KK.a)(du, 2),
            dH = da[0],
            dG = da[1],
            dy = Object(K4.useState)(''),
            dp = Object(KK.a)(dy, 2),
            dV = dp[0],
            dn = dp[1],
            dF = Object(K4.useState)(''),
            dc = Object(KK.a)(dF, 2),
            dJ = dc[0],
            dl = dc[1];
          return (
            Object(K4.useEffect)(function () {
              Kq() || (dx([]), dG(''), dl(''));
            }, []),
            Object(PZ.jsx)(PZ.Fragment, {
              children: Object(PZ.jsx)('div', {
                className: dq.mdwDmvOuterContent,
                children: Object(PZ.jsxs)('div', {
                  className: dq.mdwDmvInnerContent,
                  children: [
                    Object(PZ.jsxs)('div', {
                      className: dq.mdwDmvInnerContentLeft,
                      children: [
                        Object(PZ.jsxs)('div', {
                          className: dq.mdwDmvInnerContentLeftHeader,
                          children: [
                            Object(PZ.jsx)('div', {
                              className: 'mdw-dmv-inner-content-left-header-text-left',
                              children: Object(PZ.jsx)(Pk.a, {
                                style: {
                                  color: '#fff',
                                  wordBreak: 'break-word',
                                },
                                variant: 'h6',
                                gutterBottom: true,
                                children: 'Vehicles',
                              }),
                            }),
                            Object(PZ.jsx)('div', {
                              className: dq.mdwDmvInnerContentLeftHeaderTextRight,
                              children: Object(PZ.jsx)('div', {
                                className: 'input-wrapper',
                                children: Object(PZ.jsx)(Kk.a, {
                                  fullWidth: true,
                                  sx: { width: '100%' },
                                  children: Object(PZ.jsx)(KB.a, {
                                    sx: {
                                      '& .MuiInput-root': {
                                        color: 'white !important',
                                      },
                                      '& label.Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderColor: 'darkgray !important' },
                                      '& .MuiInput-underline:before': {
                                        borderColor: 'darkgray !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:after': {
                                        borderColor: 'white !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .Mui-focused:after': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInputAdornment-root': {
                                        color: 'darkgray !important',
                                      },
                                    },
                                    id: 'input-with-icon-textfield',
                                    label: 'Search',
                                    variant: 'standard',
                                    onChange: function (dY) {
                                      return (function (dL) {
                                        if ('' === dL || void 0 === dL) {
                                          return dX(false), void dj([]);
                                        }
                                        dj([]);
                                        dX(true);
                                        KS('ev-mdw:searchVehicles', {
                                          value: dL,
                                        }).then(function (ds) {
                                          dX(false);
                                          dj(ds.data);
                                        });
                                      })(dY.target.value);
                                    },
                                    InputProps: {
                                      startAdornment: Object(PZ.jsx)(KE.a, {
                                        position: 'start',
                                        children: Object(PZ.jsx)('i', {
                                          className: 'fas fa-search fa-w-16 fa-fw',
                                        }),
                                      }),
                                    },
                                  }),
                                }),
                              }),
                            }),
                          ],
                        }),
                        Object(PZ.jsxs)('div', {
                          className: dq.mdwDmvInnerContentLeftBody,
                          children: [
                            dg && dg.length > 0
                              ? dg.map(function (dY) {
                                  return Object(PZ.jsx)(PZ.Fragment, {
                                    children: Object(PZ.jsx)(
                                      'div',
                                      {
                                        onClick: function () {
                                          return (
                                            (dL = dY.vin),
                                            dB(true),
                                            void KS('ev-mdw:loadVehicle', {
                                              value: dL,
                                            }).then(function (dR) {
                                              dX(false);
                                              dx(dR.data.vehicle);
                                              df('');
                                              dw('');
                                              dn('');
                                              dG('Content goes here...');
                                              dl('Content goes here...');
                                              (void 0 === dR.data.vehicle.plate && null === dR.data.vehicle.plate) || df(dR.data.vehicle.plate);
                                              (void 0 === dR.data.vehicle.cid && null === dR.data.vehicle.cid) || dw(dR.data.vehicle.cid);
                                              (void 0 === dR.data.vehicle.vehiclepic && null === dR.data.vehicle.vehiclepic) || dn(dR.data.vehicle.vehiclepic);
                                              (void 0 === dR.data.vehicle.information && null === dR.data.vehicle.information) || dG(dR.data.vehicle.information);
                                              dB(false);
                                            })
                                          );
                                          var dL;
                                        },
                                        id: dY.vin,
                                        className: 'component-paper cursor-pointer',
                                        style: {
                                          width: '100%',
                                          borderBottom: '0px solid #fff',
                                          borderRadius: '0px',
                                          backgroundColor: '#222831',
                                        },
                                        children: Object(PZ.jsx)('div', {
                                          className: 'main-container',
                                          children: Object(PZ.jsx)('div', {
                                            className: 'details',
                                            children: Object(PZ.jsxs)('div', {
                                              className: 'description',
                                              children: [
                                                Object(PZ.jsx)('div', {
                                                  className: 'flex-row',
                                                  children: Object(PZ.jsxs)(Pk.a, {
                                                    style: {
                                                      color: '#fff',
                                                      wordBreak: 'break-word',
                                                    },
                                                    variant: 'body2',
                                                    gutterBottom: true,
                                                    children: [dY.model, ' - ', dY.plate],
                                                  }),
                                                }),
                                                Object(PZ.jsx)('div', {
                                                  className: 'flex-row',
                                                  children: Object(PZ.jsxs)(Pk.a, {
                                                    style: {
                                                      color: '#fff',
                                                      wordBreak: 'break-word',
                                                    },
                                                    variant: 'body2',
                                                    gutterBottom: true,
                                                    children: ['ID: ', dY.vin],
                                                  }),
                                                }),
                                              ],
                                            }),
                                          }),
                                        }),
                                      },
                                      dY.id,
                                    ),
                                  });
                                })
                              : Object(PZ.jsx)(PZ.Fragment, {}),
                            Object(PZ.jsx)('div', {
                              className: 'spinner-wrapper',
                              style: {
                                display: dh ? '' : 'none',
                                alignItems: 'baseline',
                                marginTop: '15%',
                              },
                              children: Object(PZ.jsxs)('div', {
                                className: 'lds-spinner',
                                children: [
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                ],
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    Object(PZ.jsx)('div', {
                      className: dq.mdwInnerContentDivider,
                    }),
                    Object(PZ.jsxs)('div', {
                      className: dq.mdwDmvInnerContentMiddle,
                      children: [
                        Object(PZ.jsxs)('div', {
                          className: dq.mdwDmvInnerContentMiddleHeader,
                          children: [
                            Object(PZ.jsx)('div', {
                              className: 'mdw-dmv-inner-content-middle-header-text-left',
                              children: Object(PZ.jsx)(Pk.a, {
                                style: {
                                  color: '#fff',
                                  wordBreak: 'break-word',
                                },
                                variant: 'h6',
                                gutterBottom: true,
                                children: void 0 !== dZ.id ? 'Edit Vehicle (#'.concat(dZ.id, ')') : 'Vehicle',
                              }),
                            }),
                            Object(PZ.jsx)('div', {
                              className: dq.mdwDmvInnerContentMiddleHeaderTextRight,
                              style: { paddingRight: '0px' },
                              children: Object(PZ.jsx)(KZ.a, {
                                direction: 'row',
                                spacing: 1,
                                children: Object(PZ.jsx)('div', {
                                  children: Object(PZ.jsx)(Pf.a, {
                                    title: 'Save Vehicle',
                                    placement: 'top',
                                    sx: {
                                      backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                    },
                                    arrow: true,
                                    children: Object(PZ.jsx)('i', {
                                      onClick: function () {
                                        return (
                                          dB(true),
                                          void (void 0 !== dZ.id && null !== dZ.id
                                            ? KS('ev-mdw:editVehicle', {
                                                id: dZ.id,
                                                image: dV,
                                                info: dJ,
                                              }).then(function (dD) {
                                                dX(false);
                                                dx(dD.data.vehicle);
                                                df('');
                                                dw('');
                                                dn('');
                                                dG('Content goes here...');
                                                dl('Content goes here...');
                                                (void 0 === dD.data.vehicle.plate && null === dD.data.vehicle.plate) || df(dD.data.vehicle.plate);
                                                (void 0 === dD.data.vehicle.cid && null === dD.data.vehicle.cid) || dw(dD.data.vehicle.cid);
                                                (void 0 === dD.data.vehicle.vehiclepic && null === dD.data.vehicle.vehiclepic) || dn(dD.data.vehicle.vehiclepic);
                                                (void 0 === dD.data.vehicle.information && null === dD.data.vehicle.information) || dG(dD.data.vehicle.information);
                                                dB(false);
                                              })
                                            : dB(false))
                                        );
                                      },
                                      className: 'fas fa-save fa-w-14',
                                      style: {
                                        display: void 0 !== dZ.id ? '' : 'none',
                                        color: '#fff',
                                      },
                                    }),
                                  }),
                                }),
                              }),
                            }),
                          ],
                        }),
                        Object(PZ.jsx)('div', {
                          className: 'mdw-inner-content-pre-wrapper',
                          style: {
                            display: 'flex',
                            flexDirection: 'column',
                          },
                          children: Object(PZ.jsxs)('div', {
                            className: dq.mdwDmvInnerContentMiddleBody,
                            style: { flexDirection: 'row' },
                            children: [
                              Object(PZ.jsx)('div', {
                                className: dq.mdwCreateImage,
                                children: Object(PZ.jsx)('img', {
                                  alt: '',
                                  src:
                                    (dZ.length > 0 && null !== dZ.vehiclepic) || void 0 !== dZ.vehiclepic
                                      ? ''.concat(dZ.vehiclepic)
                                      : 'https://media.discordapp.net/attachments/925804352260685875/969132283846094868/placeholder-single.png',
                                  style: {
                                    height: '163px',
                                    width: '185px',
                                    maxHeight: '163px',
                                    maxWidth: '185px',
                                  },
                                }),
                              }),
                              Object(PZ.jsxs)('div', {
                                className: 'mdw-create-inputs',
                                style: { width: '85%' },
                                children: [
                                  Object(PZ.jsx)('div', {
                                    className: 'input-wrapper',
                                    style: { marginBottom: '2.5%' },
                                    children: Object(PZ.jsx)(Kk.a, {
                                      fullWidth: true,
                                      sx: { width: '100%' },
                                      children: Object(PZ.jsx)(KB.a, {
                                        sx: {
                                          '& .MuiInput-root': {
                                            color: 'white !important',
                                          },
                                          '& label.Mui-focused': {
                                            color: 'darkgray !important',
                                          },
                                          '& Mui-focused': {
                                            color: 'darkgray !important',
                                          },
                                          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                            borderColor: 'darkgray !important',
                                          },
                                          '& .MuiInput-underline:before': {
                                            borderColor: 'darkgray !important',
                                            color: 'darkgray !important',
                                          },
                                          '& .MuiInput-underline:after': {
                                            borderColor: 'white !important',
                                            color: 'darkgray !important',
                                          },
                                          '& .Mui-focused:after': {
                                            color: 'darkgray !important',
                                          },
                                          '& .MuiInputAdornment-root': {
                                            color: 'darkgray !important',
                                          },
                                        },
                                        id: 'input-with-icon-textfield',
                                        label: 'License Plate',
                                        variant: 'standard',
                                        value: di,
                                        InputProps: {
                                          readOnly: true,
                                          startAdornment: Object(PZ.jsx)(KE.a, {
                                            position: 'start',
                                            children: Object(PZ.jsx)('i', {
                                              className: 'fas fa-car fa-w-16 fa-fw',
                                            }),
                                          }),
                                        },
                                      }),
                                    }),
                                  }),
                                  Object(PZ.jsx)('div', {
                                    className: 'input-wrapper',
                                    style: { marginBottom: '2.5%' },
                                    children: Object(PZ.jsx)(Kk.a, {
                                      fullWidth: true,
                                      sx: { width: '100%' },
                                      children: Object(PZ.jsx)(KB.a, {
                                        sx: {
                                          '& .MuiInput-root': {
                                            color: 'white !important',
                                          },
                                          '& label.Mui-focused': {
                                            color: 'darkgray !important',
                                          },
                                          '& Mui-focused': {
                                            color: 'darkgray !important',
                                          },
                                          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                            borderColor: 'darkgray !important',
                                          },
                                          '& .MuiInput-underline:before': {
                                            borderColor: 'darkgray !important',
                                            color: 'darkgray !important',
                                          },
                                          '& .MuiInput-underline:after': {
                                            borderColor: 'white !important',
                                            color: 'darkgray !important',
                                          },
                                          '& .Mui-focused:after': {
                                            color: 'darkgray !important',
                                          },
                                          '& .MuiInputAdornment-root': {
                                            color: 'darkgray !important',
                                          },
                                        },
                                        id: 'input-with-icon-textfield',
                                        label: 'State ID',
                                        variant: 'standard',
                                        value: dv,
                                        InputProps: {
                                          readOnly: true,
                                          startAdornment: Object(PZ.jsx)(KE.a, {
                                            position: 'start',
                                            children: Object(PZ.jsx)('i', {
                                              className: 'fas fa-user fa-w-16 fa-fw',
                                            }),
                                          }),
                                        },
                                      }),
                                    }),
                                  }),
                                  Object(PZ.jsx)('div', {
                                    className: 'input-wrapper',
                                    style: { marginBottom: '2.5%' },
                                    children: Object(PZ.jsx)(Kk.a, {
                                      fullWidth: true,
                                      sx: { width: '100%' },
                                      children: Object(PZ.jsx)(KB.a, {
                                        sx: {
                                          '& .MuiInput-root': {
                                            color: 'white !important',
                                          },
                                          '& label.Mui-focused': {
                                            color: 'darkgray !important',
                                          },
                                          '& Mui-focused': {
                                            color: 'darkgray !important',
                                          },
                                          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                            borderColor: 'darkgray !important',
                                          },
                                          '& .MuiInput-underline:before': {
                                            borderColor: 'darkgray !important',
                                            color: 'darkgray !important',
                                          },
                                          '& .MuiInput-underline:after': {
                                            borderColor: 'white !important',
                                            color: 'darkgray !important',
                                          },
                                          '& .Mui-focused:after': {
                                            color: 'darkgray !important',
                                          },
                                          '& .MuiInputAdornment-root': {
                                            color: 'darkgray !important',
                                          },
                                        },
                                        id: 'input-with-icon-textfield',
                                        label: 'Vehicle Image URL',
                                        variant: 'standard',
                                        value: dV,
                                        onChange: function (dY) {
                                          return dn(dY.target.value);
                                        },
                                        InputProps: {
                                          readOnly: void 0 === dZ.id,
                                          startAdornment: Object(PZ.jsx)(KE.a, {
                                            position: 'start',
                                            children: Object(PZ.jsx)('i', {
                                              className: 'fas fa-clipboard fa-w-16 fa-fw',
                                            }),
                                          }),
                                        },
                                      }),
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                        Object(PZ.jsx)('div', {
                          className: 'mdw-create-document',
                          style: {
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            color: '#fff',
                          },
                          children: Object(PZ.jsx)('div', {
                            className: 'mdw-creat-document-inner-cont',
                            style: {
                              width: '97%',
                              height: '99%',
                            },
                            children: Object(PZ.jsx)(Pn.a, {
                              placeholder: 'Document content goes here...',
                              dark: true,
                              onChange: function (dY) {
                                var dD = dY();
                                dl(dD);
                              },
                              value: dH,
                              className: dq.checkbox,
                              disableExtensions: [
                                'code_inline',
                                'link',
                                'ordered_list',
                                'checkbox_item',
                                'checkbox_list',
                                'image',
                                'placeholder',
                                'container_notice',
                                'table',
                                'emoji',
                                'td',
                                'th',
                                'tr',
                                'hr',
                                'code_fence',
                                'code_block',
                              ],
                            }),
                          }),
                        }),
                      ],
                    }),
                    Object(PZ.jsx)('div', {
                      className: dq.mdwInnerContentDivider,
                    }),
                    Object(PZ.jsx)('div', {
                      className: dq.mdwDmvContentWrapperRight,
                      style: { overflowY: 'auto' },
                    }),
                  ],
                }),
              }),
            })
          );
        },
        PO = Object(PB.a)({
          mdwEvidenceOuterContent: {
            width: '90%',
            height: '100%',
            padding: '8px',
          },
          mdwEvidenceInnerContent: {
            width: '100%',
            height: '100%',
            display: 'flex',
          },
          mdwEvidenceInnerContentLeft: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwEvidenceInnerContentLeftHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwEvidenceInnerContentRight: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwEvidenceInnerContentRightHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwEvidenceInnerContentLeftHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwEvidenceInnerContentLeftBody: {
            flex: '1 1 0%',
            width: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwInnerContentDivider: { width: '16px' },
          mdwEvidenceInnerContentRightBody: {
            flex: '1 1 0%',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwEvidenceInnerContentMiddle: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwEvidenceInnerContentMiddleHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwEvidenceInnerContentMiddleHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwEvidenceInnerContentMiddleBody: {
            flex: '1 1 0%',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwEvidenceContentWrapperRight: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
          mdwEvidenceTagsContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwEvidenceInnerContentRightHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
        }),
        PC = function () {
          var dq = PO(),
            dU = Object(K4.useState)(false),
            dQ = Object(KK.a)(dU, 2),
            dh = dQ[0],
            dX = dQ[1],
            dI = Object(Kb.c)(Kv),
            dS = Object(KK.a)(dI, 2),
            dg = (dS[0], dS[1]),
            dj = Object(Kb.c)(KJ),
            dr = Object(KK.a)(dj, 2),
            dk = dr[0],
            dB = dr[1],
            dE = Object(Kb.c)(Kl),
            dT = Object(KK.a)(dE, 2),
            dZ = dT[0],
            dx = dT[1],
            dA = Object(K4.useState)({}),
            dm = Object(KK.a)(dA, 2),
            di = (dm[0], dm[1]),
            df = Object(K4.useState)(0),
            db = Object(KK.a)(df, 2),
            dM = db[0],
            dv = db[1],
            dw = Object(K4.useState)('other'),
            du = Object(KK.a)(dw, 2),
            da = du[0],
            dH = du[1],
            dG = Object(K4.useState)(''),
            dy = Object(KK.a)(dG, 2),
            dp = dy[0],
            dV = dy[1],
            dn = Object(K4.useState)(''),
            dF = Object(KK.a)(dn, 2),
            dc = dF[0],
            dJ = dF[1],
            dl = Object(K4.useState)(''),
            dY = Object(KK.a)(dl, 2),
            dD = dY[0],
            dL = dY[1];
          return (
            Object(K4.useEffect)(function () {
              Kq() ||
                KS('ev-mdw:fetchEvidence', {}).then(function (ds) {
                  dB(ds.data), dx(ds.data);
                });
            }, []),
            Object(PZ.jsx)(PZ.Fragment, {
              children: Object(PZ.jsx)('div', {
                className: dq.mdwEvidenceOuterContent,
                children: Object(PZ.jsxs)('div', {
                  className: dq.mdwEvidenceInnerContent,
                  children: [
                    Object(PZ.jsxs)('div', {
                      className: dq.mdwEvidenceInnerContentLeft,
                      children: [
                        Object(PZ.jsxs)('div', {
                          className: dq.mdwEvidenceInnerContentLeftHeader,
                          children: [
                            Object(PZ.jsx)('div', {
                              className: 'mdw-evidence-inner-content-left-header-text-left',
                              children: Object(PZ.jsx)(Pk.a, {
                                style: {
                                  color: '#fff',
                                  wordBreak: 'break-word',
                                },
                                variant: 'h6',
                                gutterBottom: true,
                                children: 'Evidence',
                              }),
                            }),
                            Object(PZ.jsx)('div', {
                              className: dq.mdwEvidenceInnerContentLeftHeaderTextRight,
                              children: Object(PZ.jsx)('div', {
                                className: 'input-wrapper',
                                children: Object(PZ.jsx)(Kk.a, {
                                  fullWidth: true,
                                  sx: { width: '100%' },
                                  children: Object(PZ.jsx)(KB.a, {
                                    sx: {
                                      '& .MuiInput-root': {
                                        color: 'white !important',
                                      },
                                      '& label.Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderColor: 'darkgray !important' },
                                      '& .MuiInput-underline:before': {
                                        borderColor: 'darkgray !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:after': {
                                        borderColor: 'white !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .Mui-focused:after': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInputAdornment-root': {
                                        color: 'darkgray !important',
                                      },
                                    },
                                    id: 'input-with-icon-textfield',
                                    label: 'Search',
                                    variant: 'standard',
                                    onChange: function (dR) {
                                      return (function (dC) {
                                        if ((dX(true), '' !== dC)) {
                                          var dz = dk.filter(function (dW) {
                                            return (
                                              dW.id.toString().toLowerCase().startsWith(dC.toLowerCase()) ||
                                              dW.type.toString().toLowerCase().startsWith(dC.toLowerCase()) ||
                                              dW.identifier.toString().toLowerCase().startsWith(dC.toLowerCase()) ||
                                              dW.description.toString().toLowerCase().startsWith(dC.toLowerCase()) ||
                                              dW.cid.toString().toLowerCase().startsWith(dC.toLowerCase()) ||
                                              dW.incidentId.toString().toLowerCase().startsWith(dC.toLowerCase())
                                            );
                                          });
                                          dx(dz);
                                          dX(false);
                                        } else {
                                          dX(false);
                                          dx(dk);
                                        }
                                      })(dR.target.value);
                                    },
                                    InputProps: {
                                      startAdornment: Object(PZ.jsx)(KE.a, {
                                        position: 'start',
                                        children: Object(PZ.jsx)('i', {
                                          className: 'fas fa-search fa-w-16 fa-fw',
                                        }),
                                      }),
                                    },
                                  }),
                                }),
                              }),
                            }),
                          ],
                        }),
                        Object(PZ.jsxs)('div', {
                          className: dq.mdwEvidenceInnerContentLeftBody,
                          children: [
                            dZ && dZ.length > 0
                              ? dZ.map(function (dR) {
                                  return Object(PZ.jsx)(PZ.Fragment, {
                                    children: Object(PZ.jsx)(
                                      'div',
                                      {
                                        onClick: function () {
                                          return (
                                            (dC = dR.id),
                                            dg(true),
                                            void KS('ev-mdw:loadEvidence', {
                                              value: dC,
                                            }).then(function (dz) {
                                              dX(false);
                                              di(dz.data.data);
                                              dv(dz.data.id);
                                              dH(dz.data.type);
                                              dV(dz.data.identifier);
                                              dJ(dz.data.description);
                                              dL(dz.data.cid);
                                              dg(false);
                                            })
                                          );
                                          var dC;
                                        },
                                        id: dR.id,
                                        className: 'component-paper cursor-pointer',
                                        style: {
                                          width: '100%',
                                          borderBottom: '0px solid #fff',
                                          borderRadius: '0px',
                                          backgroundColor: '#222831',
                                        },
                                        children: Object(PZ.jsx)('div', {
                                          className: 'main-container',
                                          children: Object(PZ.jsx)('div', {
                                            className: 'details',
                                            children: Object(PZ.jsxs)('div', {
                                              className: 'description',
                                              children: [
                                                Object(PZ.jsx)('div', {
                                                  className: 'flex-row',
                                                  children: Object(PZ.jsxs)(Pk.a, {
                                                    style: {
                                                      color: '#fff',
                                                      wordBreak: 'break-word',
                                                    },
                                                    variant: 'body2',
                                                    gutterBottom: true,
                                                    children: [dR.identifier, ' - ', dR.description],
                                                  }),
                                                }),
                                                Object(PZ.jsx)('div', {
                                                  className: 'flex-row',
                                                  children: Object(PZ.jsxs)(Pk.a, {
                                                    style: {
                                                      color: '#fff',
                                                      wordBreak: 'break-word',
                                                    },
                                                    variant: 'body2',
                                                    gutterBottom: true,
                                                    children: ['ID: ', dR.id],
                                                  }),
                                                }),
                                              ],
                                            }),
                                          }),
                                        }),
                                      },
                                      dR.id,
                                    ),
                                  });
                                })
                              : Object(PZ.jsx)(PZ.Fragment, {}),
                            Object(PZ.jsx)('div', {
                              className: 'spinner-wrapper',
                              style: {
                                display: dh ? '' : 'none',
                                alignItems: 'baseline',
                                marginTop: '15%',
                              },
                              children: Object(PZ.jsxs)('div', {
                                className: 'lds-spinner',
                                children: [
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                  Object(PZ.jsx)('div', {}),
                                ],
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    Object(PZ.jsx)('div', {
                      className: dq.mdwInnerContentDivider,
                    }),
                    Object(PZ.jsxs)('div', {
                      className: dq.mdwEvidenceInnerContentMiddle,
                      children: [
                        Object(PZ.jsxs)('div', {
                          className: dq.mdwEvidenceInnerContentMiddleHeader,
                          children: [
                            Object(PZ.jsx)('div', {
                              className: 'mdw-evidence-inner-content-middle-header-text-left',
                              children: Object(PZ.jsx)(Pk.a, {
                                style: {
                                  color: '#fff',
                                  wordBreak: 'break-word',
                                },
                                variant: 'h6',
                                gutterBottom: true,
                                children: 0 !== dM ? 'View Evidence (#'.concat(dM, ')') : 'Submit Evidence',
                              }),
                            }),
                            Object(PZ.jsx)('div', {
                              className: dq.mdwEvidenceInnerContentMiddleHeaderTextRight,
                              style: { paddingRight: '0px' },
                              children: Object(PZ.jsxs)(KZ.a, {
                                direction: 'row',
                                spacing: 1,
                                children: [
                                  Object(PZ.jsx)('div', {
                                    children: Object(PZ.jsx)(Pf.a, {
                                      title: 'Submit New Evidence',
                                      placement: 'top',
                                      sx: {
                                        backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                      },
                                      arrow: true,
                                      children: Object(PZ.jsx)('i', {
                                        onClick: function () {
                                          di([]);
                                          dv(0);
                                          dH('other');
                                          dV('');
                                          dJ('');
                                          dL('');
                                        },
                                        className: 'fas fa-file-alt fa-w-14',
                                        style: {
                                          display: 0 !== dM ? '' : 'none',
                                          color: '#fff',
                                        },
                                      }),
                                    }),
                                  }),
                                  Object(PZ.jsx)('div', {
                                    children: Object(PZ.jsx)(Pf.a, {
                                      title: 'Save',
                                      placement: 'top',
                                      sx: {
                                        backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                      },
                                      arrow: true,
                                      children: Object(PZ.jsx)('i', {
                                        className: 'fas fa-save fa-w-14',
                                        style: {
                                          display: 0 !== dM ? 'none' : '',
                                          color: '#fff',
                                        },
                                      }),
                                    }),
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                        Object(PZ.jsx)('div', {
                          className: 'mdw-inner-content-pre-wrapper',
                          style: {
                            display: 'flex',
                            flexDirection: 'column',
                          },
                          children: Object(PZ.jsx)('div', {
                            className: dq.mdwEvidenceInnerContentMiddleBody,
                            style: { flexDirection: 'row' },
                            children: Object(PZ.jsxs)('div', {
                              className: 'mdw-create-inputs',
                              style: { width: '100%' },
                              children: [
                                Object(PZ.jsx)('div', {
                                  className: 'input-wrapper',
                                  style: { marginBottom: '2.5%' },
                                  children: Object(PZ.jsx)(PA.Select, {
                                    label: 'Type',
                                    value: da,
                                    items: [
                                      {
                                        id: 'other',
                                        name: 'Other',
                                      },
                                      {
                                        id: 'blood',
                                        name: 'Blood',
                                      },
                                      {
                                        id: 'casing',
                                        name: 'Casing',
                                      },
                                      {
                                        id: 'weapon',
                                        name: 'Weapon',
                                      },
                                      {
                                        id: 'photo',
                                        name: 'Photo',
                                      },
                                    ],
                                  }),
                                }),
                                Object(PZ.jsx)('div', {
                                  className: 'input-wrapper',
                                  style: { marginBottom: '2.5%' },
                                  children: Object(PZ.jsx)(Kk.a, {
                                    fullWidth: true,
                                    sx: { width: '100%' },
                                    children: Object(PZ.jsx)(KB.a, {
                                      sx: {
                                        '& .MuiInput-root': {
                                          color: 'white !important',
                                        },
                                        '& label.Mui-focused': {
                                          color: 'darkgray !important',
                                        },
                                        '& Mui-focused': {
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                          borderColor: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:before': {
                                          borderColor: 'darkgray !important',
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:after': {
                                          borderColor: 'white !important',
                                          color: 'darkgray !important',
                                        },
                                        '& .Mui-focused:after': {
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInputAdornment-root': {
                                          color: 'darkgray !important',
                                        },
                                      },
                                      id: 'input-with-icon-textfield',
                                      label: 'Identifier',
                                      variant: 'standard',
                                      value: dp,
                                      InputProps: {
                                        readOnly: 0 !== dM,
                                        startAdornment: Object(PZ.jsx)(KE.a, {
                                          position: 'start',
                                          children: Object(PZ.jsx)('i', {
                                            className: 'fas fa-pen fa-w-16 fa-fw',
                                          }),
                                        }),
                                      },
                                    }),
                                  }),
                                }),
                                Object(PZ.jsx)('div', {
                                  className: 'input-wrapper',
                                  style: { marginBottom: '2.5%' },
                                  children: Object(PZ.jsx)(Kk.a, {
                                    fullWidth: true,
                                    sx: { width: '100%' },
                                    children: Object(PZ.jsx)(KB.a, {
                                      sx: {
                                        '& .MuiInput-root': {
                                          color: 'white !important',
                                        },
                                        '& label.Mui-focused': {
                                          color: 'darkgray !important',
                                        },
                                        '& Mui-focused': {
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                          borderColor: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:before': {
                                          borderColor: 'darkgray !important',
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:after': {
                                          borderColor: 'white !important',
                                          color: 'darkgray !important',
                                        },
                                        '& .Mui-focused:after': {
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInputAdornment-root': {
                                          color: 'darkgray !important',
                                        },
                                      },
                                      id: 'input-with-icon-textfield',
                                      label: 'Description',
                                      variant: 'standard',
                                      value: dc,
                                      InputProps: {
                                        readOnly: 0 !== dM,
                                        startAdornment: Object(PZ.jsx)(KE.a, {
                                          position: 'start',
                                          children: Object(PZ.jsx)('i', {
                                            className: 'fas fa-clipboard fa-w-16 fa-fw',
                                          }),
                                        }),
                                      },
                                    }),
                                  }),
                                }),
                                Object(PZ.jsx)('div', {
                                  className: 'input-wrapper',
                                  style: { marginBottom: '2.5%' },
                                  children: Object(PZ.jsx)(Kk.a, {
                                    fullWidth: true,
                                    sx: { width: '100%' },
                                    children: Object(PZ.jsx)(KB.a, {
                                      sx: {
                                        '& .MuiInput-root': {
                                          color: 'white !important',
                                        },
                                        '& label.Mui-focused': {
                                          color: 'darkgray !important',
                                        },
                                        '& Mui-focused': {
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                          borderColor: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:before': {
                                          borderColor: 'darkgray !important',
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInput-underline:after': {
                                          borderColor: 'white !important',
                                          color: 'darkgray !important',
                                        },
                                        '& .Mui-focused:after': {
                                          color: 'darkgray !important',
                                        },
                                        '& .MuiInputAdornment-root': {
                                          color: 'darkgray !important',
                                        },
                                      },
                                      id: 'input-with-icon-textfield',
                                      label: 'CID',
                                      variant: 'standard',
                                      value: dD,
                                      InputProps: {
                                        readOnly: 0 !== dM,
                                        startAdornment: Object(PZ.jsx)(KE.a, {
                                          position: 'start',
                                          children: Object(PZ.jsx)('i', {
                                            className: 'fas fa-user fa-w-16 fa-fw',
                                          }),
                                        }),
                                      },
                                    }),
                                  }),
                                }),
                              ],
                            }),
                          }),
                        }),
                      ],
                    }),
                    Object(PZ.jsx)('div', {
                      className: dq.mdwInnerContentDivider,
                    }),
                    Object(PZ.jsx)('div', {
                      className: dq.mdwEvidenceContentWrapperRight,
                      style: { overflowY: 'auto' },
                      children: Object(PZ.jsxs)('div', {
                        className: dq.mdwEvidenceTagsContentRight,
                        children: [
                          Object(PZ.jsxs)('div', {
                            className: dq.mdwEvidenceInnerContentRightHeader,
                            style: {
                              display: 'flex',
                              width: '100%',
                              padding: '8px',
                              minHeight: '48px',
                              justifyContent: 'space-between',
                            },
                            children: [
                              Object(PZ.jsx)('div', {
                                className: 'mdw-evidence-inner-content-right-header-text-left',
                                children: Object(PZ.jsx)(Pk.a, {
                                  style: {
                                    color: '#fff',
                                    wordBreak: 'break-word',
                                  },
                                  variant: 'h6',
                                  gutterBottom: true,
                                  children: 'Tags',
                                }),
                              }),
                              Object(PZ.jsx)('div', {
                                className: dq.mdwEvidenceInnerContentRightHeaderTextRight,
                              }),
                            ],
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwEvidenceInnerContentRightBody,
                            style: {
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              flex: '0',
                              overflowY: 'unset',
                            },
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              }),
            })
          );
        },
        Pz = Object(PB.a)({
          mdwPropertiesOuterContent: {
            width: '90%',
            height: '100%',
            padding: '8px',
          },
          mdwPropertiesInnerContent: {
            width: '100%',
            height: '100%',
            display: 'flex',
          },
          mdwPropertiesInnerContentLeft: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwPropertiesInnerContentLeftHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwPropertiesInnerContentRight: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwPropertiesInnerContentRightHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwPropertiesInnerContentLeftHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwPropertiesInnerContentLeftBody: {
            flex: '1 1 0%',
            width: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwInnerContentDivider: { width: '16px' },
          mdwPropertiesInnerContentRightBody: {
            flex: '1 1 0%',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
        }),
        PN = function () {
          var dq = Pz(),
            dU = Object(Kb.c)(Ky),
            dQ = Object(KK.a)(dU, 2),
            dh = dQ[0],
            dX = dQ[1],
            dI = Object(Kb.c)(Kp),
            dS = Object(KK.a)(dI, 2),
            dg = dS[0],
            dj = dS[1];
          return (
            Object(K4.useEffect)(function () {
              Kq() ||
                KS('ev-mdw:fetchProperties', {}).then(function (dr) {
                  dX(dr.data), dj(dr.data);
                });
            }, []),
            Object(PZ.jsx)(PZ.Fragment, {
              children: Object(PZ.jsx)('div', {
                className: dq.mdwPropertiesOuterContent,
                children: Object(PZ.jsxs)('div', {
                  className: dq.mdwPropertiesInnerContent,
                  children: [
                    Object(PZ.jsxs)('div', {
                      className: dq.mdwPropertiesInnerContentLeft,
                      children: [
                        Object(PZ.jsxs)('div', {
                          className: dq.mdwPropertiesInnerContentLeftHeader,
                          children: [
                            Object(PZ.jsx)('div', {
                              className: 'mdw-properties-inner-content-left-header-text-left',
                              children: Object(PZ.jsx)(Pk.a, {
                                style: {
                                  color: '#fff',
                                  wordBreak: 'break-word',
                                },
                                variant: 'h6',
                                gutterBottom: true,
                                children: 'Properties',
                              }),
                            }),
                            Object(PZ.jsx)('div', {
                              className: dq.mdwPropertiesInnerContentLeftHeaderTextRight,
                              children: Object(PZ.jsx)('div', {
                                className: 'input-wrapper',
                                children: Object(PZ.jsx)(Kk.a, {
                                  fullWidth: true,
                                  sx: { width: '100%' },
                                  children: Object(PZ.jsx)(KB.a, {
                                    sx: {
                                      '& .MuiInput-root': {
                                        color: 'white !important',
                                      },
                                      '& label.Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderColor: 'darkgray !important' },
                                      '& .MuiInput-underline:before': {
                                        borderColor: 'darkgray !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:after': {
                                        borderColor: 'white !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .Mui-focused:after': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInputAdornment-root': {
                                        color: 'darkgray !important',
                                      },
                                    },
                                    id: 'input-with-icon-textfield',
                                    label: 'Search',
                                    variant: 'standard',
                                    onChange: function (dr) {
                                      return (function (dB) {
                                        if ('' !== dB) {
                                          var dT = dh.filter(function (dZ) {
                                            return dZ.street.toLowerCase().startsWith(dB.toLowerCase());
                                          });
                                          dj(dT);
                                        } else {
                                          dj(dh);
                                        }
                                      })(dr.target.value);
                                    },
                                    InputProps: {
                                      startAdornment: Object(PZ.jsx)(KE.a, {
                                        position: 'start',
                                        children: Object(PZ.jsx)('i', {
                                          className: 'fas fa-search fa-w-16 fa-fw',
                                        }),
                                      }),
                                    },
                                  }),
                                }),
                              }),
                            }),
                          ],
                        }),
                        Object(PZ.jsx)('div', {
                          className: dq.mdwPropertiesInnerContentLeftBody,
                          children:
                            dg && dg.length > 0
                              ? dg.map(function (dr) {
                                  return Object(PZ.jsx)(
                                    'div',
                                    {
                                      id: dr.hid,
                                      className: 'component-paper cursor-pointer',
                                      style: {
                                        width: '100%',
                                        borderBottom: '0px solid #fff',
                                        borderRadius: '0px',
                                        backgroundColor: '#222831',
                                      },
                                      children: Object(PZ.jsx)('div', {
                                        className: 'main-container',
                                        children: Object(PZ.jsx)('div', {
                                          className: 'details',
                                          children: Object(PZ.jsx)('div', {
                                            className: 'description',
                                            children: Object(PZ.jsxs)('div', {
                                              className: 'flex-row',
                                              style: {
                                                justifyContent: 'space-between',
                                              },
                                              children: [
                                                Object(PZ.jsx)(Pk.a, {
                                                  style: {
                                                    color: '#fff',
                                                    wordBreak: 'break-word',
                                                  },
                                                  variant: 'body2',
                                                  gutterBottom: true,
                                                  children: dr.street,
                                                }),
                                                Object(PZ.jsxs)(Pk.a, {
                                                  style: {
                                                    color: '#fff',
                                                    wordBreak: 'break-word',
                                                  },
                                                  variant: 'body2',
                                                  gutterBottom: true,
                                                  children: ['ID: ', dr.hid],
                                                }),
                                              ],
                                            }),
                                          }),
                                        }),
                                      }),
                                    },
                                    dr.hid,
                                  );
                                })
                              : Object(PZ.jsx)(PZ.Fragment, {}),
                        }),
                      ],
                    }),
                    Object(PZ.jsx)('div', {
                      className: dq.mdwInnerContentDivider,
                    }),
                    Object(PZ.jsxs)('div', {
                      className: dq.mdwPropertiesInnerContentRight,
                      children: [
                        Object(PZ.jsxs)('div', {
                          className: dq.mdwPropertiesInnerContentRightHeader,
                          children: [
                            Object(PZ.jsx)('div', {
                              className: 'mdw-properties-inner-content-right-header-text-left',
                              children: Object(PZ.jsx)(Pk.a, {
                                style: {
                                  color: '#fff',
                                  wordBreak: 'break-word',
                                },
                                variant: 'h6',
                                gutterBottom: true,
                                children: 'Property',
                              }),
                            }),
                            Object(PZ.jsx)('div', {
                              className: 'mdw-properties-inner-content-right-header-text-right',
                            }),
                          ],
                        }),
                        Object(PZ.jsx)('div', {
                          className: dq.mdwPropertiesInnerContentRightBody,
                        }),
                      ],
                    }),
                    Object(PZ.jsx)('div', {
                      className: dq.mdwInnerContentDivider,
                    }),
                    Object(PZ.jsxs)('div', {
                      className: 'mdw-properties-inner-content-right',
                      style: { backgroundColor: 'transparent' },
                      children: [
                        Object(PZ.jsxs)('div', {
                          className: 'mdw-properties-inner-content-right-header',
                          children: [
                            Object(PZ.jsx)('div', {
                              className: 'mdw-properties-inner-content-right-header-text-left',
                            }),
                            Object(PZ.jsx)('div', {
                              className: 'mdw-properties-inner-content-right-header-text-right',
                            }),
                          ],
                        }),
                        Object(PZ.jsx)('div', {
                          className: dq.mdwPropertiesInnerContentRightBody,
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            })
          );
        },
        PW = Object(PB.a)({
          mdwChargesOuterContent: {
            width: '90%',
            height: '100%',
            padding: '8px',
            overflow: 'auto',
          },
          mdwChargesInnerContent: {
            width: '100%',
            height: '100%',
            display: 'flex',
          },
          mdwChargesInnerContentLeft: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwChargesInnerContentLeftHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwChargesInnerContentRight: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwChargesInnerContentRightHeaader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwChargesInnerContentLeftHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwChargesInnerContentLeftBody: {
            flex: '1 1 0%',
            width: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwInnerContentDivider: { width: '16px' },
        }),
        d0 = function () {
          var dq = PW(),
            dU = Object(Kb.c)(KY),
            dQ = Object(KK.a)(dU, 2),
            dh = dQ[0],
            dX = dQ[1],
            dI = Object(K4.useState)(''),
            dS = Object(KK.a)(dI, 2),
            dg = dS[0],
            dj = dS[1];
          Object(K4.useEffect)(function () {
            Kq() ||
              (dX([]),
              KS('ev-mdw:fetchCharges', {}).then(function (dT) {
                dX(dT.data);
              }));
          }, []);
          var dr = function (dT) {
              return Number(dT).toLocaleString('en-Us', {
                style: 'currency',
                currency: 'USD',
              });
            },
            dk = function (dT) {
              return !dg || dT.toString().toLowerCase().includes(dg.toString().toLowerCase());
            },
            dB = dh
              .map(function (dT) {
                return Object(K8.a)(
                  Object(K8.a)({}, dT),
                  {},
                  {
                    charges: dT.charges.filter(function (dx) {
                      return dk(dx.title);
                    }),
                  },
                );
              })
              .filter(function (dT) {
                return dT.charges.length;
              });
          return Object(PZ.jsx)(PZ.Fragment, {
            children: Object(PZ.jsxs)('div', {
              className: dq.mdwChargesOuterContent,
              children: [
                Object(PZ.jsx)('div', {
                  className: dq.mdwChargesInnerContent,
                  style: {
                    height: '17%',
                    flexDirection: 'column',
                    marginBottom: '0.2%',
                  },
                  children: Object(PZ.jsxs)('div', {
                    className: dq.mdwChargesInnerContentLeft,
                    children: [
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwChargesInnerContentLeftHeader,
                        children: [
                          Object(PZ.jsx)('div', {
                            className: 'mdw-charges-inner-content-left-header-text-left',
                            children: Object(PZ.jsx)(Pk.a, {
                              style: {
                                color: '#fff',
                                wordBreak: 'break-word',
                              },
                              variant: 'h6',
                              gutterBottom: true,
                              children: 'Charges',
                            }),
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwChargesInnerContentLeftHeaderTextRight,
                            children: Object(PZ.jsx)('div', {
                              className: 'input-wrapper',
                              children: Object(PZ.jsx)(Kk.a, {
                                fullWidth: true,
                                sx: { width: '100%' },
                                children: Object(PZ.jsx)(KB.a, {
                                  sx: {
                                    '& .MuiInput-root': {
                                      color: 'white !important',
                                    },
                                    '& label.Mui-focused': {
                                      color: 'darkgray !important',
                                    },
                                    '& Mui-focused': {
                                      color: 'darkgray !important',
                                    },
                                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderColor: 'darkgray !important' },
                                    '& .MuiInput-underline:before': {
                                      borderColor: 'darkgray !important',
                                      color: 'darkgray !important',
                                    },
                                    '& .MuiInput-underline:after': {
                                      borderColor: 'white !important',
                                      color: 'darkgray !important',
                                    },
                                    '& .Mui-focused:after': {
                                      color: 'darkgray !important',
                                    },
                                    '& .MuiInputAdornment-root': {
                                      color: 'darkgray !important',
                                    },
                                  },
                                  id: 'input-with-icon-textfield',
                                  label: 'Search',
                                  variant: 'standard',
                                  onChange: function (dT) {
                                    return dj(dT.target.value);
                                  },
                                  InputProps: {
                                    startAdornment: Object(PZ.jsx)(KE.a, {
                                      position: 'start',
                                      children: Object(PZ.jsx)('i', {
                                        className: 'fas fa-search fa-w-16 fa-fw',
                                      }),
                                    }),
                                  },
                                }),
                              }),
                            }),
                          }),
                        ],
                      }),
                      Object(PZ.jsx)('div', {
                        className: dq.mdwChargesInnerContentLeftBody,
                        children: Object(PZ.jsx)('div', {
                          className: 'component-paper cursor-pointer',
                          style: {
                            width: '100%',
                            borderBottom: '0px solid #fff',
                            borderRadius: '0px',
                            backgroundColor: '#222831',
                            border: '1px solid #000',
                          },
                          children: Object(PZ.jsx)('div', {
                            className: 'main-container',
                            children: Object(PZ.jsx)('div', {
                              className: 'details',
                              children: Object(PZ.jsx)('div', {
                                className: 'description',
                                children: Object(PZ.jsx)('div', {
                                  className: 'flex-row',
                                  children: Object(PZ.jsx)(Pk.a, {
                                    style: {
                                      color: '#fff',
                                      wordBreak: 'break-word',
                                    },
                                    variant: 'body2',
                                    gutterBottom: true,
                                    children:
                                      'An accomplice differs from an accessory in that an accomplice is present at the actual crime, and could be prosecuted even if the main criminal (the principal) is not charged or convicted. An accessory is generally not present at the actual crime, and may be subject to lesser penalties than an accomplice or principal.',
                                  }),
                                }),
                              }),
                            }),
                          }),
                        }),
                      }),
                    ],
                  }),
                }),
                dB && dB.length > 0
                  ? dB.map(function (dT) {
                      return Object(PZ.jsx)('div', {
                        className: dq.mdwChargesInnerContent,
                        style: {
                          height: 'fit-content',
                          flexDirection: 'column',
                          marginBottom: '0.2%',
                        },
                        children: Object(PZ.jsxs)('div', {
                          className: dq.mdwChargesInnerContentLeft,
                          children: [
                            Object(PZ.jsxs)('div', {
                              className: dq.mdwChargesInnerContentLeftHeader,
                              children: [
                                Object(PZ.jsx)('div', {
                                  className: 'mdw-charges-inner-content-left-header-text-left',
                                  children: Object(PZ.jsx)(Pk.a, {
                                    style: {
                                      color: '#fff',
                                      wordBreak: 'break-word',
                                    },
                                    variant: 'h6',
                                    gutterBottom: true,
                                    children: dT.category,
                                  }),
                                }),
                                Object(PZ.jsx)('div', {
                                  className: dq.mdwChargesInnerContentLeftHeaderTextRight,
                                }),
                              ],
                            }),
                            Object(PZ.jsx)('div', {
                              className: dq.mdwChargesInnerContentLeftBody,
                              style: {
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                flex: '0',
                                overflowY: 'unset',
                                paddingLeft: '1.5%',
                              },
                              children:
                                dT.charges && dT.charges.length > 0
                                  ? dT.charges
                                      .filter(function (dx) {
                                        return dk(dx.title);
                                      })
                                      .map(function (dx) {
                                        return Object(PZ.jsx)('div', {
                                          className: 'component-paper cursor-pointer',
                                          style: {
                                            width: '30%',
                                            borderBottom: '0px solid #fff',
                                            borderRadius: '0px',
                                            backgroundColor: ''.concat(dT.color),
                                            border: '1px solid #000',
                                            marginRight: '2%',
                                            height: 'fit-content',
                                          },
                                          children: Object(PZ.jsx)('div', {
                                            className: 'main-container',
                                            children: Object(PZ.jsx)('div', {
                                              className: 'details',
                                              children: Object(PZ.jsxs)('div', {
                                                className: 'description',
                                                children: [
                                                  Object(PZ.jsx)('div', {
                                                    className: 'flex-row',
                                                    style: {
                                                      flexDirection: 'column',
                                                    },
                                                    children: Object(PZ.jsx)(Pk.a, {
                                                      style: {
                                                        color: '#fff',
                                                        wordBreak: 'break-word',
                                                        textAlign: 'center',
                                                      },
                                                      variant: 'body1',
                                                      gutterBottom: true,
                                                      children: dx.title,
                                                    }),
                                                  }),
                                                  Object(PZ.jsxs)('div', {
                                                    className: 'flex-row',
                                                    style: {
                                                      flexDirection: 'row',
                                                      justifyContent: 'space-evenly',
                                                    },
                                                    children: [
                                                      Object(PZ.jsxs)(Pk.a, {
                                                        style: {
                                                          color: '#fff',
                                                          wordBreak: 'break-word',
                                                          textAlign: 'center',
                                                        },
                                                        variant: 'body2',
                                                        gutterBottom: true,
                                                        children: [void 0 !== dx.months ? dx.months : '0', ' months'],
                                                      }),
                                                      Object(PZ.jsx)(Pk.a, {
                                                        style: {
                                                          color: '#fff',
                                                          wordBreak: 'break-word',
                                                          textAlign: 'center',
                                                        },
                                                        variant: 'body2',
                                                        gutterBottom: true,
                                                        children: void 0 !== dx.fine ? dr(dx.fine) : '$0.0',
                                                      }),
                                                      Object(PZ.jsxs)(Pk.a, {
                                                        style: {
                                                          color: '#fff',
                                                          wordBreak: 'break-word',
                                                          textAlign: 'center',
                                                        },
                                                        variant: 'body2',
                                                        gutterBottom: true,
                                                        children: [void 0 !== dx.points ? dx.points : '0', ' point(s)'],
                                                      }),
                                                    ],
                                                  }),
                                                  Object(PZ.jsx)('div', {
                                                    style: {
                                                      marginTop: '1%',
                                                      marginBottom: '0.3%',
                                                    },
                                                    children: Object(PZ.jsx)(Km.a, {
                                                      style: {
                                                        borderColor: '#30475e',
                                                      },
                                                      variant: 'fullWidth',
                                                    }),
                                                  }),
                                                  Object(PZ.jsx)('div', {
                                                    className: 'flex-row',
                                                    style: {
                                                      flexDirection: 'column',
                                                    },
                                                    children: Object(PZ.jsx)(Pk.a, {
                                                      style: {
                                                        color: '#fff',
                                                        wordBreak: 'break-word',
                                                        textAlign: 'center',
                                                      },
                                                      variant: 'body2',
                                                      gutterBottom: true,
                                                      children: 'as Accomplice',
                                                    }),
                                                  }),
                                                  Object(PZ.jsxs)('div', {
                                                    className: 'flex-row',
                                                    style: {
                                                      flexDirection: 'row',
                                                      justifyContent: 'space-evenly',
                                                    },
                                                    children: [
                                                      Object(PZ.jsxs)(Pk.a, {
                                                        style: {
                                                          color: '#fff',
                                                          wordBreak: 'break-word',
                                                          textAlign: 'center',
                                                        },
                                                        variant: 'body2',
                                                        gutterBottom: true,
                                                        children: [void 0 !== dx.months ? dx.months : '0', ' months'],
                                                      }),
                                                      Object(PZ.jsx)(Pk.a, {
                                                        style: {
                                                          color: '#fff',
                                                          wordBreak: 'break-word',
                                                          textAlign: 'center',
                                                        },
                                                        variant: 'body2',
                                                        gutterBottom: true,
                                                        children: void 0 !== dx.fine ? dr(dx.fine) : '$0.0',
                                                      }),
                                                      Object(PZ.jsxs)(Pk.a, {
                                                        style: {
                                                          color: '#fff',
                                                          wordBreak: 'break-word',
                                                          textAlign: 'center',
                                                        },
                                                        variant: 'body2',
                                                        gutterBottom: true,
                                                        children: [void 0 !== dx.points ? dx.points : '0', ' point(s)'],
                                                      }),
                                                    ],
                                                  }),
                                                  Object(PZ.jsx)('div', {
                                                    style: {
                                                      marginTop: '1%',
                                                      marginBottom: '0.3%',
                                                    },
                                                    children: Object(PZ.jsx)(Km.a, {
                                                      style: {
                                                        borderColor: '#30475e',
                                                      },
                                                      variant: 'fullWidth',
                                                    }),
                                                  }),
                                                  Object(PZ.jsx)('div', {
                                                    className: 'flex-row',
                                                    style: {
                                                      flexDirection: 'column',
                                                    },
                                                    children: Object(PZ.jsx)(Pk.a, {
                                                      style: {
                                                        color: '#fff',
                                                        wordBreak: 'break-word',
                                                        textAlign: 'center',
                                                      },
                                                      variant: 'body2',
                                                      gutterBottom: true,
                                                      children: 'as Accessory',
                                                    }),
                                                  }),
                                                  Object(PZ.jsxs)('div', {
                                                    className: 'flex-row',
                                                    style: {
                                                      flexDirection: 'row',
                                                      justifyContent: 'space-evenly',
                                                      marginBottom: '0.3%',
                                                    },
                                                    children: [
                                                      Object(PZ.jsx)(Pk.a, {
                                                        style: {
                                                          color: '#fff',
                                                          wordBreak: 'break-word',
                                                          textAlign: 'center',
                                                        },
                                                        variant: 'body2',
                                                        gutterBottom: true,
                                                        children: '0 months',
                                                      }),
                                                      Object(PZ.jsx)(Pk.a, {
                                                        style: {
                                                          color: '#fff',
                                                          wordBreak: 'break-word',
                                                          textAlign: 'center',
                                                        },
                                                        variant: 'body2',
                                                        gutterBottom: true,
                                                        children: '$0.00',
                                                      }),
                                                      Object(PZ.jsx)(Pk.a, {
                                                        style: {
                                                          color: '#fff',
                                                          wordBreak: 'break-word',
                                                          textAlign: 'center',
                                                        },
                                                        variant: 'body2',
                                                        gutterBottom: true,
                                                        children: '0 point(s)',
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            }),
                                          }),
                                        });
                                      })
                                  : Object(PZ.jsx)(PZ.Fragment, {}),
                            }),
                          ],
                        }),
                      });
                    })
                  : Object(PZ.jsx)(PZ.Fragment, {}),
              ],
            }),
          });
        },
        d1 = Object(PB.a)({
          mdwBusinessesOuterContent: {
            width: '90%',
            height: '100%',
            padding: '8px',
          },
          mdwBusinessesInnerContent: {
            width: '100%',
            height: '100%',
            display: 'flex',
          },
          mdwBusinessesInnerContentLeft: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwBusinessesInnerContentLeftHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwBusinessesInnerContentRight: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwBusinessesInnerContentRightHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwBusinessesInnerContentLeftHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwBusinessesInnerContentLeftBody: {
            flex: '1 1 0%',
            width: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwInnerContentDivider: { width: '16px' },
          mdwBusinessesInnerContentRightBody: {
            flex: '1 1 0%',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
        }),
        d2 = function () {
          var dq = d1(),
            dU = Object(Kb.c)(Kv),
            dQ = Object(KK.a)(dU, 2),
            dh = (dQ[0], dQ[1]),
            dX = Object(Kb.c)(KV),
            dI = Object(KK.a)(dX, 2),
            dS = dI[0],
            dg = dI[1],
            dj = Object(Kb.c)(Kn),
            dr = Object(KK.a)(dj, 2),
            dk = dr[0],
            dB = dr[1],
            dE = Object(Kb.c)(KF),
            dT = Object(KK.a)(dE, 2),
            dZ = dT[0],
            dx = dT[1],
            dA = Object(K4.useState)([]),
            dm = Object(KK.a)(dA, 2),
            di = dm[0],
            df = dm[1],
            db = Object(Kb.c)(Kc),
            dM = Object(KK.a)(db, 2),
            dv = dM[0],
            dw = dM[1];
          return (
            Object(K4.useEffect)(function () {
              Kq() ||
                (dx([]),
                dw(0),
                KS('ev-mdw:fetchBusinesses', {}).then(function (da) {
                  dg(da.data);
                  dB(da.data);
                }));
            }, []),
            Object(PZ.jsx)(PZ.Fragment, {
              children: Object(PZ.jsx)('div', {
                className: dq.mdwBusinessesOuterContent,
                children: Object(PZ.jsxs)('div', {
                  className: dq.mdwBusinessesInnerContent,
                  children: [
                    Object(PZ.jsxs)('div', {
                      className: dq.mdwBusinessesInnerContentLeft,
                      children: [
                        Object(PZ.jsxs)('div', {
                          className: dq.mdwBusinessesInnerContentLeftHeader,
                          children: [
                            Object(PZ.jsx)('div', {
                              className: 'mdw-businesses-inner-content-left-header-text-left',
                              children: Object(PZ.jsx)(Pk.a, {
                                style: {
                                  color: '#fff',
                                  wordBreak: 'break-word',
                                },
                                variant: 'h6',
                                gutterBottom: true,
                                children: 'Business Directory',
                              }),
                            }),
                            Object(PZ.jsx)('div', {
                              className: dq.mdwBusinessesInnerContentLeftHeaderTextRight,
                              children: Object(PZ.jsx)('div', {
                                className: 'input-wrapper',
                                children: Object(PZ.jsx)(Kk.a, {
                                  fullWidth: true,
                                  sx: { width: '100%' },
                                  children: Object(PZ.jsx)(KB.a, {
                                    sx: {
                                      '& .MuiInput-root': {
                                        color: 'white !important',
                                      },
                                      '& label.Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderColor: 'darkgray !important' },
                                      '& .MuiInput-underline:before': {
                                        borderColor: 'darkgray !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:after': {
                                        borderColor: 'white !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .Mui-focused:after': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInputAdornment-root': {
                                        color: 'darkgray !important',
                                      },
                                    },
                                    id: 'input-with-icon-textfield',
                                    label: 'Search',
                                    variant: 'standard',
                                    onChange: function (du) {
                                      return (function (dH) {
                                        if ('' !== dH) {
                                          var dG = dS.filter(function (dy) {
                                            return dy.business_name.toLowerCase().startsWith(dH.toLowerCase()) || dy.bank_id.toString().toLowerCase().startsWith(dH.toString().toLowerCase());
                                          });
                                          dB(dG);
                                        } else {
                                          dB(dS);
                                        }
                                      })(du.target.value);
                                    },
                                    InputProps: {
                                      startAdornment: Object(PZ.jsx)(KE.a, {
                                        position: 'start',
                                        children: Object(PZ.jsx)('i', {
                                          className: 'fas fa-search fa-w-16 fa-fw',
                                        }),
                                      }),
                                    },
                                  }),
                                }),
                              }),
                            }),
                          ],
                        }),
                        Object(PZ.jsx)('div', {
                          className: dq.mdwBusinessesInnerContentLeftBody,
                          children:
                            dk && dk.length > 0
                              ? dk.map(function (du) {
                                  return Object(PZ.jsx)(
                                    'div',
                                    {
                                      onClick: function () {
                                        return (
                                          (dG = du.business_id),
                                          dh(true),
                                          void KS('ev-mdw:loadBusiness', {
                                            value: dG,
                                          }).then(function (dp) {
                                            dx(dp.data.employees);
                                            df(dp.data.employees);
                                            dw(dp.data.count);
                                            dh(false);
                                          })
                                        );
                                        var dG;
                                      },
                                      id: du.business_id,
                                      className: 'component-paper cursor-pointer',
                                      style: {
                                        width: '100%',
                                        borderBottom: '0px solid #fff',
                                        borderRadius: '0px',
                                        backgroundColor: '#222831',
                                      },
                                      children: Object(PZ.jsx)('div', {
                                        className: 'main-container',
                                        children: Object(PZ.jsx)('div', {
                                          className: 'details',
                                          children: Object(PZ.jsx)('div', {
                                            className: 'description',
                                            children: Object(PZ.jsxs)('div', {
                                              className: 'flex-row',
                                              style: {
                                                justifyContent: 'space-between',
                                              },
                                              children: [
                                                Object(PZ.jsx)(Pk.a, {
                                                  style: {
                                                    color: '#fff',
                                                    wordBreak: 'break-word',
                                                  },
                                                  variant: 'body2',
                                                  gutterBottom: true,
                                                  children: du.business_name,
                                                }),
                                                Object(PZ.jsxs)(Pk.a, {
                                                  style: {
                                                    color: '#fff',
                                                    wordBreak: 'break-word',
                                                  },
                                                  variant: 'body2',
                                                  gutterBottom: true,
                                                  children: ['Account ID: ', du.bank_id],
                                                }),
                                              ],
                                            }),
                                          }),
                                        }),
                                      }),
                                    },
                                    du.business_id,
                                  );
                                })
                              : Object(PZ.jsx)(PZ.Fragment, {}),
                        }),
                      ],
                    }),
                    Object(PZ.jsx)('div', {
                      className: dq.mdwInnerContentDivider,
                    }),
                    Object(PZ.jsxs)('div', {
                      className: dq.mdwBusinessesInnerContentRight,
                      children: [
                        Object(PZ.jsxs)('div', {
                          className: dq.mdwBusinessesInnerContentRightHeader,
                          children: [
                            Object(PZ.jsx)('div', {
                              className: 'mdw-businesses-inner-content-right-header-text-left',
                              children: Object(PZ.jsxs)(Pk.a, {
                                style: {
                                  color: '#fff',
                                  wordBreak: 'break-word',
                                },
                                variant: 'h6',
                                gutterBottom: true,
                                children: ['Employee List (', 0 === dv || void 0 === dv ? '0' : dv, ')'],
                              }),
                            }),
                            Object(PZ.jsx)('div', {
                              className: 'mdw-businesses-inner-content-right-header-text-right',
                              children: Object(PZ.jsx)('div', {
                                className: 'input-wrapper',
                                children: Object(PZ.jsx)(Kk.a, {
                                  fullWidth: true,
                                  sx: { width: '100%' },
                                  children: Object(PZ.jsx)(KB.a, {
                                    sx: {
                                      '& .MuiInput-root': {
                                        color: 'white !important',
                                      },
                                      '& label.Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderColor: 'darkgray !important' },
                                      '& .MuiInput-underline:before': {
                                        borderColor: 'darkgray !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:after': {
                                        borderColor: 'white !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .Mui-focused:after': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInputAdornment-root': {
                                        color: 'darkgray !important',
                                      },
                                    },
                                    id: 'input-with-icon-textfield',
                                    label: 'Search',
                                    variant: 'standard',
                                    onChange: function (du) {
                                      return (function (dH) {
                                        if ('' !== dH) {
                                          var dy = ['employee_cid', 'employee_name', 'employee_role'],
                                            dp = di,
                                            dV = dH.toString().toLowerCase(),
                                            dn = dp
                                              .filter(function (dc) {
                                                return Object.keys(dc).some(function (dJ) {
                                                  return dy.includes(dJ);
                                                });
                                              })
                                              .filter(function (dc) {
                                                return Object.values(dc)
                                                  .map(function (dY) {
                                                    return dY.toString().toLocaleLowerCase();
                                                  })
                                                  .some(function (dY) {
                                                    return dY.startsWith(dV);
                                                  });
                                              });
                                          df(dn);
                                        } else {
                                          df(dZ);
                                        }
                                      })(du.target.value);
                                    },
                                    InputProps: {
                                      startAdornment: Object(PZ.jsx)(KE.a, {
                                        position: 'start',
                                        children: Object(PZ.jsx)('i', {
                                          className: 'fas fa-search fa-w-16 fa-fw',
                                        }),
                                      }),
                                    },
                                  }),
                                }),
                              }),
                            }),
                          ],
                        }),
                        Object(PZ.jsx)('div', {
                          className: dq.mdwBusinessesInnerContentRightBody,
                          children:
                            di && di.length > 0
                              ? di.map(function (du) {
                                  return Object(PZ.jsx)(
                                    'div',
                                    {
                                      className: 'component-paper cursor-pointer',
                                      style: {
                                        width: '100%',
                                        borderBottom: '0px solid #fff',
                                        borderRadius: '0px',
                                        backgroundColor: '#222831',
                                      },
                                      children: Object(PZ.jsx)('div', {
                                        className: 'main-container',
                                        children: Object(PZ.jsx)('div', {
                                          className: 'details',
                                          children: Object(PZ.jsxs)('div', {
                                            className: 'description',
                                            children: [
                                              Object(PZ.jsxs)('div', {
                                                className: 'flex-row',
                                                style: {
                                                  justifyContent: 'space-between',
                                                },
                                                children: [
                                                  Object(PZ.jsx)(Pk.a, {
                                                    style: {
                                                      color: '#fff',
                                                      wordBreak: 'break-word',
                                                    },
                                                    variant: 'body2',
                                                    gutterBottom: true,
                                                    children: du.employee_name,
                                                  }),
                                                  Object(PZ.jsxs)(Pk.a, {
                                                    style: {
                                                      color: '#fff',
                                                      wordBreak: 'break-word',
                                                    },
                                                    variant: 'body2',
                                                    gutterBottom: true,
                                                    children: ['Role: ', du.employee_role],
                                                  }),
                                                ],
                                              }),
                                              Object(PZ.jsx)('div', {
                                                className: 'flex-row',
                                                children: Object(PZ.jsxs)(Pk.a, {
                                                  style: {
                                                    color: '#fff',
                                                    wordBreak: 'break-word',
                                                  },
                                                  variant: 'body2',
                                                  gutterBottom: true,
                                                  children: ['State ID: ', du.employee_cid],
                                                }),
                                              }),
                                            ],
                                          }),
                                        }),
                                      }),
                                    },
                                    du.employee_cid,
                                  );
                                })
                              : Object(PZ.jsx)(PZ.Fragment, {}),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            })
          );
        },
        d3 = function () {
          var dq = Object(K4.useState)([]),
            dU = Object(KK.a)(dq, 2),
            dQ = dU[0],
            dh = dU[1];
          return {
            notifications: dQ,
            addNotification: function (dX) {
              return dh(function (dI) {
                return [].concat(Object(K9.a)(dI), [dX]);
              });
            },
            deleteNotification: function (dX) {
              return dh(function (dS) {
                return dS.filter(function (dr) {
                  return dr.id !== dX;
                });
              });
            },
          };
        },
        d4 = function (dd) {
          var dU = dd.deleteNotification,
            dQ = dd.notification.id,
            dh = Object(K4.useState)(false),
            dX = Object(KK.a)(dh, 2),
            dI = dX[0],
            dS = dX[1];
          return (
            Object(K4.useEffect)(function () {
              var dj = setTimeout(function () {
                dS(true);
                setTimeout(function () {
                  dU(dQ);
                }, 300);
              }, 2000);
              return function () {
                clearTimeout(dj);
              };
            }, []),
            Object(PZ.jsx)('div', {
              className: dI ? 'component-paper cursor-pointer top-right-out' : 'component-paper cursor-pointer top-right-in',
              style: {
                width: '100%',
                borderBottom: '0px solid #fff',
                borderRadius: '0px',
                backgroundColor: 'rgba(9, 60, 176, 0.7)',
                borderRight: '4px solid #227ddf',
              },
              children: Object(PZ.jsx)('div', {
                className: 'main-container',
                children: Object(PZ.jsx)('div', {
                  className: 'details',
                  children: Object(PZ.jsxs)('div', {
                    className: 'description',
                    children: [
                      Object(PZ.jsxs)('div', {
                        className: 'flex-row',
                        children: [
                          Object(PZ.jsx)('div', {
                            style: {
                              paddingRight: '1.5%',
                              paddingBottom: '1.5%',
                            },
                            children: Object(PZ.jsx)(KA.a, {
                              size: 'small',
                              label: '411',
                              sx: {
                                backgroundColor: '#a0ef7d',
                                color: '#000',
                              },
                            }),
                          }),
                          Object(PZ.jsx)('div', {
                            style: {
                              paddingRight: '1.5%',
                              paddingBottom: '1.5%',
                            },
                            children: Object(PZ.jsx)(KA.a, {
                              size: 'small',
                              label: '911',
                              sx: {
                                backgroundColor: '#f6a968',
                                color: '#000',
                              },
                            }),
                          }),
                          Object(PZ.jsx)(Pk.a, {
                            style: {
                              paddingBottom: '2%',
                              textShadow: 'rgb(55, 71, 79) -1px 1px 0px, rgb(55, 71, 79) 1px 1px 0px, rgb(55, 71, 79) 1px -1px 0px, rgb(55, 71, 79) -1px -1px 0px',
                              fontFamily: 'Arial, Helvetica, sans-serif',
                              letterSpacing: '0px',
                              fontWeight: 600,
                              textDecoration: 'none',
                              fontStyle: 'normal',
                              fontVariant: 'small-caps',
                              textTransform: 'none',
                              width: '100%',
                            },
                            variant: 'body2',
                            gutterBottom: true,
                            children: 'An incoming 911 call!',
                          }),
                          Object(PZ.jsx)('i', {
                            className: 'fas fa-map-marker-alt fa-w-12 fa-2x fa-fw',
                            style: { color: '#fff' },
                          }),
                        ],
                      }),
                      Object(PZ.jsx)('div', {
                        className: 'flex-row',
                        children: Object(PZ.jsx)(Pk.a, {
                          style: {
                            textShadow: 'rgb(55, 71, 79) -1px 1px 0px, rgb(55, 71, 79) 1px 1px 0px, rgb(55, 71, 79) 1px -1px 0px, rgb(55, 71, 79) -1px -1px 0px',
                            fontFamily: 'Arial, Helvetica, sans-serif',
                            letterSpacing: '0px',
                            fontWeight: 600,
                            textDecoration: 'none',
                            fontStyle: 'normal',
                            fontVariant: 'small-caps',
                            textTransform: 'none',
                            width: '100%',
                          },
                          variant: 'body2',
                          gutterBottom: true,
                          children: '4158497339 - I need medical help down at the tuner shop right now',
                        }),
                      }),
                      Object(PZ.jsxs)('div', {
                        className: 'flex-row',
                        children: [
                          Object(PZ.jsx)('i', {
                            className: 'fas fa-clock fa-fw',
                            style: {
                              color: '#fff',
                              fontSize: '0.875rem',
                              lineHeight: '1.43',
                              marginRight: '1.5%',
                            },
                          }),
                          Object(PZ.jsx)(Pk.a, {
                            style: {
                              textShadow: 'rgb(55, 71, 79) -1px 1px 0px, rgb(55, 71, 79) 1px 1px 0px, rgb(55, 71, 79) 1px -1px 0px, rgb(55, 71, 79) -1px -1px 0px',
                              fontFamily: 'Arial, Helvetica, sans-serif',
                              letterSpacing: '0px',
                              fontWeight: 600,
                              textDecoration: 'none',
                              fontStyle: 'normal',
                              fontVariant: 'small-caps',
                              textTransform: 'none',
                              width: '100%',
                            },
                            variant: 'body2',
                            gutterBottom: true,
                            children: 'A few seconds ago',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              }),
            })
          );
        },
        d5 = Object(PB.a)({
          dispatchContainer: {
            top: 'unset',
            left: 'unset',
            right: '15px',
            bottom: '15px',
            position: 'absolute',
            backgroundColor: '#222832',
            width: '25vw',
            height: '30vh',
            borderTop: '2px solid #08396e',
          },
          dispatchWrapper: {
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            width: '100%',
          },
          policeWrapper: {
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            padding: '8px',
          },
          emsWrapper: {
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            padding: '8px',
          },
          unitWrapper: { height: '100%' },
          unitContainer: {
            height: '95%',
            maxHeight: '95%',
            overflow: 'hidden',
            overflowY: 'scroll',
            overflowX: 'hidden',
          },
          dispatchContainerWrap: {
            top: '20px',
            right: '30px',
            position: 'fixed',
            width: '25vw',
            height: '30vh',
          },
        }),
        d6 = function () {
          var dq = d5(),
            dU = d3(),
            dQ = dU.addNotification,
            dh = dU.deleteNotification,
            dX = dU.notifications,
            dI = Object(K4.useState)(0),
            dS = Object(KK.a)(dI, 2),
            dg = dS[0],
            dj = dS[1],
            dr = Object(K4.useState)([]),
            dk = Object(KK.a)(dr, 2),
            dB = dk[0],
            dE = dk[1],
            dT = Object(K4.useState)(''),
            dZ = Object(KK.a)(dT, 2),
            dx = dZ[0],
            dA = dZ[1],
            dm = Object(K4.useState)(''),
            di = Object(KK.a)(dm, 2),
            df = di[0],
            db = di[1],
            dM = Object(K4.useState)([
              {
                id: '1',
                cid: '1',
                callsign: '123',
                name: 'Kevin Malagnaggi',
                vehicle: 'car',
                icon: 'car-side',
              },
              {
                id: '2',
                cid: '2',
                callsign: '124',
                name: 'Jerry Padel',
                vehicle: 'car',
                icon: 'car-side',
              },
              {
                id: '3',
                cid: '3',
                callsign: '125',
                name: 'Kevin Zarreletti',
                vehicle: 'car',
                icon: 'car-side',
              },
              {
                id: '4',
                cid: '4',
                callsign: '126',
                name: 'Terrence Cruz',
                vehicle: 'car',
                icon: 'car-side',
              },
              {
                id: '5',
                cid: '5',
                callsign: '126',
                name: 'Terrence Cruz',
                vehicle: 'car',
                icon: 'car-side',
              },
              {
                id: '6',
                cid: '6',
                callsign: '126',
                name: 'Terrence Cruz',
                vehicle: 'car',
                icon: 'car-side',
              },
              {
                id: '7',
                cid: '6',
                callsign: '126',
                name: 'Terrence Cruz',
                vehicle: 'car',
                icon: 'car-side',
              },
              {
                id: '8',
                cid: '6',
                callsign: '126',
                name: 'Terrence Cruz',
                vehicle: 'car',
                icon: 'car-side',
              },
            ]),
            dv = Object(KK.a)(dM, 2),
            dw = dv[0],
            du = dv[1];
          Object(K4.useEffect)(function () {
            Kq() && (dy(true), dE(['call', 'call', 'call', 'call', 'call', 'call', 'call']));
          });
          var da = Object(K4.useState)(false),
            dH = Object(KK.a)(da, 2),
            dG = dH[0],
            dy = dH[1];
          KQ('dispatch', function (dN) {
            if ('addPing' === dN.action) {
              dQ({ id: dg });
              dj(dg + 1);
              var dW = [].concat(Object(K9.a)(dB), ['call']);
              dE(dW);
            }
            'showDispatch' === dN.action && dy(dN.show);
          });
          var dp = K5.a.useState(null),
            dV = Object(KK.a)(dp, 2),
            dn = dV[0],
            dF = dV[1],
            dc = Boolean(dn),
            dJ = K5.a.useState(null),
            dl = Object(KK.a)(dJ, 2),
            dY = dl[0],
            dD = dl[1],
            dL = Boolean(dY),
            dR = function (dN, dW, q0) {
              dF(dN.currentTarget);
              dA(dW);
              db(q0);
            },
            ds = function (dN) {
              dD(dN.currentTarget);
            },
            dO = function () {
              dD(null);
            },
            dC = function (dN) {
              dF(null);
              var q0 = Object(K9.a)(dw),
                q1 = dw.findIndex(function (q3) {
                  return q3.cid.toString() === dx.toString();
                });
              q0[q1].vehicle = dN;
              'car' === dN
                ? (q0[q1].icon = 'car-side')
                : 'helicopter' === dN
                ? (q0[q1].icon = 'helicopter')
                : 'motorbike' === dN
                ? (q0[q1].icon = 'motorcycle')
                : 'bicycle' === dN
                ? (q0[q1].icon = 'bicycle')
                : 'interceptor' === dN && (q0[q1].icon = 'horse-head');
              du(q0);
            };
          return (
            Kr(dy),
            Object(PZ.jsxs)(PZ.Fragment, {
              children: [
                Object(PZ.jsx)('div', {
                  style: {
                    display: dG ? 'flex' : 'none',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    zIndex: 500,
                  },
                  children: Object(PZ.jsx)('div', {
                    className: 'dispatch-column-wrap',
                    style: {
                      display: 'flex',
                      flexDirection: 'column-reverse',
                      width: '44.3vh',
                      height: '70.5vh',
                      margin: 'auto',
                      marginTop: '1vh',
                      paddingBottom: '2.5vh',
                      marginRight: '1.5vh',
                      overflowY: 'scroll',
                      alignContent: 'flex-start',
                    },
                    children:
                      dB && dB.length > 0
                        ? dB.map(function (dN, dW) {
                            return Object(PZ.jsx)('div', {
                              className: 'component-paper cursor-pointer top-right-in',
                              style: {
                                position: 'unset',
                                borderBottom: '0px solid #fff',
                                borderRadius: '0px',
                                backgroundColor: 'rgba(9, 60, 176, 0.7)',
                                borderRight: '4px solid #227ddf',
                              },
                              onClick: ds,
                              children: Object(PZ.jsx)('div', {
                                className: 'main-container',
                                children: Object(PZ.jsx)('div', {
                                  className: 'details',
                                  children: Object(PZ.jsxs)('div', {
                                    className: 'description',
                                    children: [
                                      Object(PZ.jsxs)('div', {
                                        className: 'flex-row',
                                        children: [
                                          Object(PZ.jsx)('div', {
                                            style: {
                                              paddingRight: '1.5%',
                                              paddingBottom: '1.5%',
                                            },
                                            children: Object(PZ.jsx)(KA.a, {
                                              size: 'small',
                                              label: dW,
                                              sx: {
                                                backgroundColor: '#a0ef7d',
                                                color: '#000',
                                              },
                                            }),
                                          }),
                                          Object(PZ.jsx)('div', {
                                            style: {
                                              paddingRight: '1.5%',
                                              paddingBottom: '1.5%',
                                            },
                                            children: Object(PZ.jsx)(KA.a, {
                                              size: 'small',
                                              label: '911',
                                              sx: {
                                                backgroundColor: '#f6a968',
                                                color: '#000',
                                              },
                                            }),
                                          }),
                                          Object(PZ.jsx)(Pk.a, {
                                            style: {
                                              paddingBottom: '2%',
                                              textShadow: 'rgb(55, 71, 79) -1px 1px 0px, rgb(55, 71, 79) 1px 1px 0px, rgb(55, 71, 79) 1px -1px 0px, rgb(55, 71, 79) -1px -1px 0px',
                                              fontFamily: 'Arial, Helvetica, sans-serif',
                                              letterSpacing: '0px',
                                              fontWeight: 600,
                                              textDecoration: 'none',
                                              fontStyle: 'normal',
                                              fontVariant: 'small-caps',
                                              textTransform: 'none',
                                              width: '100%',
                                            },
                                            variant: 'body2',
                                            gutterBottom: true,
                                            children: 'An incoming 911 call!',
                                          }),
                                          Object(PZ.jsx)('i', {
                                            onClick: function (q1) {
                                              return q1.stopPropagation();
                                            },
                                            className: 'fas fa-map-marker-alt fa-w-12 fa-2x fa-fw',
                                            style: { color: '#fff' },
                                          }),
                                        ],
                                      }),
                                      Object(PZ.jsx)('div', {
                                        className: 'flex-row',
                                        children: Object(PZ.jsx)(Pk.a, {
                                          style: {
                                            textShadow: 'rgb(55, 71, 79) -1px 1px 0px, rgb(55, 71, 79) 1px 1px 0px, rgb(55, 71, 79) 1px -1px 0px, rgb(55, 71, 79) -1px -1px 0px',
                                            fontFamily: 'Arial, Helvetica, sans-serif',
                                            letterSpacing: '0px',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            fontStyle: 'normal',
                                            fontVariant: 'small-caps',
                                            textTransform: 'none',
                                            width: '100%',
                                          },
                                          variant: 'body2',
                                          gutterBottom: true,
                                          children: '4158497339 - I need medical help down at the tuner shop right now',
                                        }),
                                      }),
                                      Object(PZ.jsxs)('div', {
                                        className: 'flex-row',
                                        children: [
                                          Object(PZ.jsx)('i', {
                                            className: 'fas fa-clock fa-fw',
                                            style: {
                                              color: '#fff',
                                              fontSize: '0.875rem',
                                              lineHeight: '1.43',
                                              marginRight: '1.5%',
                                            },
                                          }),
                                          Object(PZ.jsx)(Pk.a, {
                                            style: {
                                              textShadow: 'rgb(55, 71, 79) -1px 1px 0px, rgb(55, 71, 79) 1px 1px 0px, rgb(55, 71, 79) 1px -1px 0px, rgb(55, 71, 79) -1px -1px 0px',
                                              fontFamily: 'Arial, Helvetica, sans-serif',
                                              letterSpacing: '0px',
                                              fontWeight: 600,
                                              textDecoration: 'none',
                                              fontStyle: 'normal',
                                              fontVariant: 'small-caps',
                                              textTransform: 'none',
                                              width: '100%',
                                            },
                                            variant: 'body2',
                                            gutterBottom: true,
                                            children: 'A few seconds ago',
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                              }),
                            });
                          })
                        : Object(PZ.jsx)(PZ.Fragment, {}),
                  }),
                }),
                Object(PZ.jsxs)(Pb.a, {
                  id: 'fade-menu',
                  MenuListProps: { 'aria-labelledby': 'fade-button' },
                  anchorEl: dY,
                  open: dL,
                  onClose: dO,
                  children: [
                    Object(PZ.jsx)(KT.a, {
                      onClick: function () {
                        return dO();
                      },
                      children: 'Set GPS Location',
                    }),
                    Object(PZ.jsx)(KT.a, {
                      onClick: function () {
                        return dO();
                      },
                      children: 'Create Call',
                    }),
                    Object(PZ.jsx)(KT.a, {
                      onClick: function () {
                        return dO();
                      },
                      children: 'Dismiss Ping (From Map/List)',
                    }),
                  ],
                }),
                Object(PZ.jsx)('div', {
                  className: 'top-right-in',
                  style: {
                    position: 'fixed',
                    boxSizing: 'border-box',
                  },
                  children: Object(PZ.jsx)('div', {
                    className: 'column-wrap top-right-in',
                    style: {
                      display: dX.length > 0 && !dG ? 'flex' : 'none',
                      flexDirection: 'column-reverse',
                    },
                    children: dX.map(function (dN) {
                      return Object(PZ.jsx)(
                        d4,
                        {
                          deleteNotification: dh,
                          notification: dN,
                        },
                        dN.id,
                      );
                    }),
                  }),
                }),
                Object(PZ.jsxs)('div', {
                  className: dq.dispatchContainer,
                  style: {
                    display: dG ? '' : 'none',
                    zIndex: 1000,
                  },
                  children: [
                    Object(PZ.jsxs)('div', {
                      className: dq.dispatchWrapper,
                      children: [
                        Object(PZ.jsx)('div', {
                          className: dq.policeWrapper,
                          children: Object(PZ.jsxs)('div', {
                            className: dq.unitWrapper,
                            children: [
                              Object(PZ.jsx)(Pk.a, {
                                style: {
                                  color: '#fff',
                                  wordBreak: 'break-word',
                                },
                                variant: 'body1',
                                children: 'Police',
                              }),
                              Object(PZ.jsx)('div', {
                                className: dq.unitContainer,
                                children:
                                  dw && dw.length > 0
                                    ? dw.map(function (dN, dW) {
                                        return Object(PZ.jsx)('div', {
                                          className: 'component-dispatch cursor-pointer',
                                          onClick: function (q0) {
                                            return dR(q0, dN.cid, dN.vehicle);
                                          },
                                          children: Object(PZ.jsxs)('div', {
                                            className: 'main-container',
                                            children: [
                                              Object(PZ.jsx)('div', {
                                                className: 'image',
                                                children: Object(PZ.jsx)('i', {
                                                  className: 'fas fa-'.concat(dN.icon, ' fa-w-14 fa-fw fa-lg'),
                                                }),
                                              }),
                                              Object(PZ.jsx)('div', {
                                                className: 'details',
                                                children: Object(PZ.jsx)('div', {
                                                  className: 'title',
                                                  children: Object(PZ.jsx)(KA.a, {
                                                    size: 'small',
                                                    label: ''.concat(dN.callsign, ' - ').concat(dN.name),
                                                    sx: {
                                                      backgroundColor: '#95ef77',
                                                      color: '#000',
                                                    },
                                                  }),
                                                }),
                                              }),
                                              Object(PZ.jsx)('div', {
                                                className: 'actions',
                                              }),
                                            ],
                                          }),
                                        });
                                      })
                                    : Object(PZ.jsx)(PZ.Fragment, {}),
                              }),
                            ],
                          }),
                        }),
                        Object(PZ.jsx)('div', {
                          className: dq.emsWrapper,
                          children: Object(PZ.jsxs)('div', {
                            className: dq.unitWrapper,
                            children: [
                              Object(PZ.jsx)(Pk.a, {
                                style: {
                                  color: '#fff',
                                  wordBreak: 'break-word',
                                },
                                variant: 'body1',
                                children: 'EMS',
                              }),
                              Object(PZ.jsx)('div', {
                                className: dq.unitContainer,
                                children: Object(PZ.jsx)('div', {
                                  className: 'component-dispatch cursor-pointer',
                                  onClick: function (dN) {
                                    return dR(dN, '1', 'car');
                                  },
                                  children: Object(PZ.jsxs)('div', {
                                    className: 'main-container',
                                    children: [
                                      Object(PZ.jsx)('div', {
                                        className: 'image',
                                        children: Object(PZ.jsx)('i', {
                                          className: 'fas fa-car-side fa-w-14 fa-fw fa-lg',
                                        }),
                                      }),
                                      Object(PZ.jsx)('div', {
                                        className: 'details',
                                        children: Object(PZ.jsx)('div', {
                                          className: 'title',
                                          children: Object(PZ.jsx)(KA.a, {
                                            size: 'small',
                                            label: 'E-921 - Frank Sotela',
                                            sx: {
                                              backgroundColor: '#95ef77',
                                              color: '#000',
                                            },
                                          }),
                                        }),
                                      }),
                                      Object(PZ.jsx)('div', {
                                        className: 'actions',
                                      }),
                                    ],
                                  }),
                                }),
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    Object(PZ.jsxs)(Pb.a, {
                      id: 'fade-menu',
                      MenuListProps: { 'aria-labelledby': 'fade-button' },
                      anchorEl: dn,
                      open: dc,
                      onClose: function () {
                        dF(null);
                      },
                      children: [
                        Object(PZ.jsx)(KT.a, {
                          sx: { display: 'car' !== df ? '' : 'none' },
                          onClick: function () {
                            return dC('car');
                          },
                          children: 'Vehicle: Car',
                        }),
                        Object(PZ.jsx)(KT.a, {
                          sx: { display: 'helicopter' !== df ? '' : 'none' },
                          onClick: function () {
                            return dC('helicopter');
                          },
                          children: 'Vehicle: Helicopter',
                        }),
                        Object(PZ.jsx)(KT.a, {
                          sx: { display: 'motorbike' !== df ? '' : 'none' },
                          onClick: function () {
                            return dC('motorbike');
                          },
                          children: 'Vehicle: Motorbike',
                        }),
                        Object(PZ.jsx)(KT.a, {
                          sx: { display: 'bicycle' !== df ? '' : 'none' },
                          onClick: function () {
                            return dC('bicycle');
                          },
                          children: 'Vehicle: Bicycle',
                        }),
                        Object(PZ.jsx)(KT.a, {
                          sx: { display: 'interceptor' !== df ? '' : 'none' },
                          onClick: function () {
                            return dC('interceptor');
                          },
                          children: 'Vehicle: Interceptor',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            })
          );
        },
        d7 = K2(810),
        d8 = Object(PB.a)({
          mdwStaffOuterContent: {
            width: '90%',
            height: '100%',
            padding: '8px',
          },
          mdwStaffInnerContent: {
            width: '100%',
            height: '100%',
            display: 'flex',
          },
          mdwStaffInnerContentLeft: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwStaffInnerContentLeftHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwStaffInnerContentMiddle: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwStaffInnerContentMiddleHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwStaffInnerContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
          },
          mdwStaffInnerContentRightHeader: {
            width: '100%',
            display: 'flex',
            padding: '8px',
            minHeight: '48px',
            justifyContent: 'space-between',
          },
          mdwStaffInnerContentRightHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwCreateImage: { marginRight: '8px' },
          mdwStaffContentWrapperRight: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
          mdwStaffLicensesContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwStaffTagsContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwStaffVehiclesContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwStaffHousingContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwStaffHotelsContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwStaffStorageContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwStaffEmploymentContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwStaffPriorsContentRight: {
            width: '100%',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgb(30, 58, 86)',
            marginBottom: '1.5%',
          },
          mdwStaffInnerContentLeftHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwStaffInnerContentLeftBody: {
            flex: '1 1 0%',
            width: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwInnerContentDivider: { width: '16px' },
          mdwStaffInnerContentMiddleHeaderTextRight: {
            maxWidth: '40%',
            paddingRight: '8px',
          },
          mdwStaffInnerContentMiddleBody: {
            flex: '1 1 0%',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          mdwStaffInnerContentRightBody: {
            flex: '1 1 0%',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '8px',
            maxHeight: '100%',
            overflowY: 'auto',
            flexDirection: 'column',
          },
          checkbox: {
            '&:hover': { backgroundColor: 'transparent !important' },
          },
        }),
        d9 = function () {
          var dq = d8(),
            dU = Object(K4.useState)(false),
            dQ = Object(KK.a)(dU, 2),
            dh = dQ[0],
            dX = dQ[1],
            dI = Object(Kb.c)(Kv),
            dS = Object(KK.a)(dI, 2),
            dg = (dS[0], dS[1]),
            dj = Object(Kb.c)(KR),
            dr = Object(KK.a)(dj, 2),
            dk = dr[0],
            dB = dr[1],
            dE = Object(Kb.c)(Ks),
            dT = Object(KK.a)(dE, 2),
            dZ = dT[0],
            dx = dT[1],
            dA = Object(Kb.c)(Ka),
            dm = Object(KK.a)(dA, 2),
            di = (dm[0], dm[1]),
            df = Object(K4.useState)([]),
            db = Object(KK.a)(df, 2),
            dM = db[0],
            dv = db[1],
            dw = Object(K4.useState)(''),
            du = Object(KK.a)(dw, 2),
            da = du[0],
            dH = du[1],
            dG = Object(K4.useState)(''),
            dy = Object(KK.a)(dG, 2),
            dp = dy[0],
            dV = dy[1],
            dn = Object(K4.useState)(''),
            dF = Object(KK.a)(dn, 2),
            dc = dF[0],
            dJ = dF[1],
            dl = Object(K4.useState)(''),
            dY = Object(KK.a)(dl, 2),
            dD = dY[0],
            dL = dY[1],
            dR = Object(K4.useState)(''),
            ds = Object(KK.a)(dR, 2),
            dO = ds[0],
            dC = ds[1],
            dz = K5.a.useState(null),
            dN = Object(KK.a)(dz, 2),
            dW = dN[0],
            q0 = dN[1],
            q1 = Boolean(dW);
          Object(K4.useEffect)(function () {
            Kq() ||
              KS('ev-mdw:fetchStaff', {}).then(function (q4) {
                dB(q4.data);
                dx(q4.data);
              });
          }, []);
          var q2 = function (q3, q4) {
            var q6;
            'click' === q3.type
              ? ((q6 = q4),
                dg(true),
                KS('ev-mdw:loadStaff', { value: q6 }).then(function (q7) {
                  dX(false);
                  dv(q7.data.staff);
                  dH('');
                  dV('');
                  dJ('');
                  dL('1');
                  (void 0 === q7.data.staff.name && null === q7.data.staff.name) || dH(q7.data.staff.name);
                  (void 0 === q7.data.staff.cid && null === q7.data.staff.cid) || dV(q7.data.staff.cid);
                  (void 0 === q7.data.staff.callsign && null === q7.data.staff.callsign) || dJ(q7.data.staff.callsign);
                  (void 0 === q7.data.staff.rank && null === q7.data.staff.rank) || dL(q7.data.staff.rank);
                  dg(false);
                }))
              : 'contextmenu' === q3.type && (q0(q3.currentTarget), dC(q4));
          };
          return Object(PZ.jsx)(PZ.Fragment, {
            children: Object(PZ.jsx)('div', {
              className: dq.mdwStaffOuterContent,
              children: Object(PZ.jsxs)('div', {
                className: dq.mdwStaffInnerContent,
                children: [
                  Object(PZ.jsxs)('div', {
                    className: dq.mdwStaffInnerContentLeft,
                    children: [
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwStaffInnerContentLeftHeader,
                        children: [
                          Object(PZ.jsx)('div', {
                            className: 'mdw-staff-inner-content-left-header-text-left',
                            children: Object(PZ.jsx)(Pk.a, {
                              style: {
                                color: '#fff',
                                wordBreak: 'break-word',
                              },
                              variant: 'h6',
                              gutterBottom: true,
                              children: 'Staff',
                            }),
                          }),
                          Object(PZ.jsxs)('div', {
                            className: dq.mdwStaffInnerContentLeftHeaderTextRight,
                            children: [
                              Object(PZ.jsx)('div', {
                                style: {
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                },
                                children: Object(PZ.jsx)(Pf.a, {
                                  title: 'Hire',
                                  placement: 'top',
                                  sx: {
                                    backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                  },
                                  arrow: true,
                                  children: Object(PZ.jsx)('i', {
                                    onClick: function () {
                                      return di(true);
                                    },
                                    className: 'fas fa-plus fa-w-14',
                                    style: { color: '#fff' },
                                  }),
                                }),
                              }),
                              Object(PZ.jsx)('div', {
                                className: 'input-wrapper',
                                children: Object(PZ.jsx)(Kk.a, {
                                  fullWidth: true,
                                  sx: { width: '100%' },
                                  children: Object(PZ.jsx)(KB.a, {
                                    sx: {
                                      '& .MuiInput-root': {
                                        color: 'white !important',
                                      },
                                      '& label.Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderColor: 'darkgray !important' },
                                      '& .MuiInput-underline:before': {
                                        borderColor: 'darkgray !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:after': {
                                        borderColor: 'white !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .Mui-focused:after': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInputAdornment-root': {
                                        color: 'darkgray !important',
                                      },
                                    },
                                    id: 'input-with-icon-textfield',
                                    label: 'Search',
                                    variant: 'standard',
                                    onChange: function (q3) {
                                      return (function (q4) {
                                        if ('' !== q4) {
                                          var q6 = dk.filter(function (q7) {
                                            var q8, q9, qK;
                                            return (
                                              (null === (q8 = q7.cid) || void 0 === q8 ? void 0 : q8.toString().toLowerCase().startsWith(q4.toLowerCase())) ||
                                              (null === (q9 = q7.name) || void 0 === q9 ? void 0 : q9.toString().toLowerCase().startsWith(q4.toLowerCase())) ||
                                              (null === (qK = q7.callsign) || void 0 === qK ? void 0 : qK.toString().toLowerCase().startsWith(q4.toLowerCase()))
                                            );
                                          });
                                          dx(q6);
                                        } else {
                                          dx(dk);
                                        }
                                      })(q3.target.value);
                                    },
                                    InputProps: {
                                      startAdornment: Object(PZ.jsx)(KE.a, {
                                        position: 'start',
                                        children: Object(PZ.jsx)('i', {
                                          className: 'fas fa-search fa-w-16 fa-fw',
                                        }),
                                      }),
                                    },
                                  }),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwStaffInnerContentLeftBody,
                        children: [
                          Object(PZ.jsx)(Pb.a, {
                            id: 'fade-menu',
                            MenuListProps: { 'aria-labelledby': 'fade-button' },
                            anchorEl: dW,
                            open: q1,
                            onClose: function () {
                              q0(null), dC('');
                            },
                            children: Object(PZ.jsxs)(KT.a, {
                              onClick: function () {
                                return (
                                  q0(null),
                                  dg(true),
                                  void KS('ev-mdw:fireStaff', {
                                    cid: dO,
                                  }).then(function (q4) {
                                    dB(q4.data);
                                    dx(q4.data);
                                    dC('');
                                    dg(false);
                                  })
                                );
                              },
                              children: [
                                Object(PZ.jsx)(PM.a, {
                                  children: Object(PZ.jsx)('i', {
                                    className: 'fas fa-times',
                                  }),
                                }),
                                Object(PZ.jsx)(Pk.a, {
                                  variant: 'inherit',
                                  style: { color: '#fff' },
                                  children: 'Fire',
                                }),
                              ],
                            }),
                          }),
                          dZ && dZ.length > 0
                            ? dZ.map(function (q3) {
                                return Object(PZ.jsx)(PZ.Fragment, {
                                  children: Object(PZ.jsx)(
                                    'div',
                                    {
                                      onClick: function (q5) {
                                        return q2(q5, q3.cid);
                                      },
                                      onContextMenu: function (q5) {
                                        return q2(q5, q3.cid);
                                      },
                                      id: q3.id,
                                      className: 'component-paper cursor-pointer',
                                      style: {
                                        width: '100%',
                                        borderBottom: '0px solid #fff',
                                        borderRadius: '0px',
                                        backgroundColor: '#222831',
                                      },
                                      children: Object(PZ.jsx)('div', {
                                        className: 'main-container',
                                        children: Object(PZ.jsx)('div', {
                                          className: 'details',
                                          children: Object(PZ.jsxs)('div', {
                                            className: 'description',
                                            children: [
                                              Object(PZ.jsx)('div', {
                                                className: 'flex-row',
                                                children: Object(PZ.jsxs)(Pk.a, {
                                                  style: {
                                                    color: '#fff',
                                                    wordBreak: 'break-word',
                                                  },
                                                  variant: 'body2',
                                                  gutterBottom: true,
                                                  children: ['(', q3.callsign, ') ', q3.name],
                                                }),
                                              }),
                                              Object(PZ.jsx)('div', {
                                                className: 'flex-row',
                                                children: Object(PZ.jsxs)(Pk.a, {
                                                  style: {
                                                    color: '#fff',
                                                    wordBreak: 'break-word',
                                                  },
                                                  variant: 'body2',
                                                  gutterBottom: true,
                                                  children: ['State ID: ', q3.cid],
                                                }),
                                              }),
                                            ],
                                          }),
                                        }),
                                      }),
                                    },
                                    q3.id,
                                  ),
                                });
                              })
                            : Object(PZ.jsx)(PZ.Fragment, {}),
                          Object(PZ.jsx)('div', {
                            className: 'spinner-wrapper',
                            style: {
                              display: dh ? '' : 'none',
                              alignItems: 'baseline',
                              marginTop: '15%',
                            },
                            children: Object(PZ.jsxs)('div', {
                              className: 'lds-spinner',
                              children: [
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                                Object(PZ.jsx)('div', {}),
                              ],
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  Object(PZ.jsx)('div', {
                    className: dq.mdwInnerContentDivider,
                  }),
                  Object(PZ.jsxs)('div', {
                    className: dq.mdwStaffInnerContentMiddle,
                    children: [
                      Object(PZ.jsxs)('div', {
                        className: dq.mdwStaffInnerContentMiddleHeader,
                        children: [
                          Object(PZ.jsx)('div', {
                            className: 'mdw-staff-inner-content-middle-header-text-left',
                            children: Object(PZ.jsx)(Pk.a, {
                              style: {
                                color: '#fff',
                                wordBreak: 'break-word',
                              },
                              variant: 'h6',
                              gutterBottom: true,
                              children: void 0 !== dM.id ? 'Edit Staff (#'.concat(dM.id, ')') : 'Staff',
                            }),
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwStaffInnerContentMiddleHeaderTextRight,
                            style: { paddingRight: '0px' },
                            children: Object(PZ.jsx)(KZ.a, {
                              direction: 'row',
                              spacing: 1,
                              children: Object(PZ.jsx)('div', {
                                children: Object(PZ.jsx)(Pf.a, {
                                  title: 'Save Staff',
                                  placement: 'top',
                                  sx: {
                                    backgroundColor: 'rgba(97, 97, 97, 0.9)',
                                  },
                                  arrow: true,
                                  children: Object(PZ.jsx)('i', {
                                    onClick: function () {
                                      return (
                                        dg(true),
                                        void (void 0 !== dM.id && null !== dM.id
                                          ? KS('ev-mdw:editStaff', {
                                              id: dM.cid,
                                              callsign: dc,
                                              rank: dD,
                                            }).then(function (q3) {
                                              dX(false);
                                              dv(q3.data.staff);
                                              dH('');
                                              dV('');
                                              dJ('');
                                              dL('1');
                                              (void 0 === q3.data.staff.name && null === q3.data.staff.name) || dH(q3.data.staff.name);
                                              (void 0 === q3.data.staff.cid && null === q3.data.staff.cid) || dV(q3.data.staff.cid);
                                              (void 0 === q3.data.staff.callsign && null === q3.data.staff.callsign) || dJ(q3.data.staff.callsign);
                                              (void 0 === q3.data.staff.rank && null === q3.data.staff.rank) || dL(q3.data.staff.rank);
                                              dg(false);
                                            })
                                          : dg(false))
                                      );
                                    },
                                    className: 'fas fa-save fa-w-14',
                                    style: {
                                      display: void 0 !== dM.id ? '' : 'none',
                                      color: '#fff',
                                    },
                                  }),
                                }),
                              }),
                            }),
                          }),
                        ],
                      }),
                      Object(PZ.jsx)('div', {
                        className: 'mdw-inner-content-pre-wrapper',
                        style: {
                          display: 'flex',
                          flexDirection: 'column',
                        },
                        children: Object(PZ.jsx)('div', {
                          className: dq.mdwStaffInnerContentMiddleBody,
                          style: { flexDirection: 'row' },
                          children: Object(PZ.jsxs)('div', {
                            className: 'mdw-create-inputs',
                            style: { width: '100%' },
                            children: [
                              Object(PZ.jsx)('div', {
                                className: 'input-wrapper',
                                style: { marginBottom: '2.5%' },
                                children: Object(PZ.jsx)(Kk.a, {
                                  fullWidth: true,
                                  sx: { width: '100%' },
                                  children: Object(PZ.jsx)(KB.a, {
                                    sx: {
                                      '& .MuiInput-root': {
                                        color: 'white !important',
                                      },
                                      '& label.Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderColor: 'darkgray !important' },
                                      '& .MuiInput-underline:before': {
                                        borderColor: 'darkgray !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:after': {
                                        borderColor: 'white !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .Mui-focused:after': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInputAdornment-root': {
                                        color: 'darkgray !important',
                                      },
                                    },
                                    id: 'input-with-icon-textfield',
                                    label: 'Name',
                                    variant: 'standard',
                                    value: da,
                                    InputProps: {
                                      readOnly: true,
                                      startAdornment: Object(PZ.jsx)(KE.a, {
                                        position: 'start',
                                        children: Object(PZ.jsx)('i', {
                                          className: 'fas fa-user fa-w-16 fa-fw',
                                        }),
                                      }),
                                    },
                                  }),
                                }),
                              }),
                              Object(PZ.jsx)('div', {
                                className: 'input-wrapper',
                                style: { marginBottom: '2.5%' },
                                children: Object(PZ.jsx)(Kk.a, {
                                  fullWidth: true,
                                  sx: { width: '100%' },
                                  children: Object(PZ.jsx)(KB.a, {
                                    sx: {
                                      '& .MuiInput-root': {
                                        color: 'white !important',
                                      },
                                      '& label.Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderColor: 'darkgray !important' },
                                      '& .MuiInput-underline:before': {
                                        borderColor: 'darkgray !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:after': {
                                        borderColor: 'white !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .Mui-focused:after': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInputAdornment-root': {
                                        color: 'darkgray !important',
                                      },
                                    },
                                    id: 'input-with-icon-textfield',
                                    label: 'State ID',
                                    variant: 'standard',
                                    value: dp,
                                    InputProps: {
                                      readOnly: true,
                                      startAdornment: Object(PZ.jsx)(KE.a, {
                                        position: 'start',
                                        children: Object(PZ.jsx)('i', {
                                          className: 'fas fa-id-card fa-w-16 fa-fw',
                                        }),
                                      }),
                                    },
                                  }),
                                }),
                              }),
                              Object(PZ.jsx)('div', {
                                className: 'input-wrapper',
                                style: { marginBottom: '2.5%' },
                                children: Object(PZ.jsx)(Kk.a, {
                                  fullWidth: true,
                                  sx: { width: '100%' },
                                  children: Object(PZ.jsx)(KB.a, {
                                    sx: {
                                      '& .MuiInput-root': {
                                        color: 'white !important',
                                      },
                                      '& label.Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderColor: 'darkgray !important' },
                                      '& .MuiInput-underline:before': {
                                        borderColor: 'darkgray !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:after': {
                                        borderColor: 'white !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .Mui-focused:after': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInputAdornment-root': {
                                        color: 'darkgray !important',
                                      },
                                    },
                                    id: 'input-with-icon-textfield',
                                    label: 'Callsign',
                                    variant: 'standard',
                                    value: dc,
                                    onChange: function (q3) {
                                      return dJ(q3.target.value);
                                    },
                                    InputProps: {
                                      readOnly: void 0 === dk.id,
                                      startAdornment: Object(PZ.jsx)(KE.a, {
                                        position: 'start',
                                        children: Object(PZ.jsx)('i', {
                                          className: 'fas fa-clipboard fa-w-16 fa-fw',
                                        }),
                                      }),
                                    },
                                  }),
                                }),
                              }),
                              Object(PZ.jsx)('div', {
                                className: 'input-wrapper',
                                style: { marginBottom: '2.5%' },
                                children: Object(PZ.jsx)(Kk.a, {
                                  fullWidth: true,
                                  sx: { width: '100%' },
                                  children: Object(PZ.jsxs)(KB.a, {
                                    id: 'outlined-select-currency',
                                    variant: 'standard',
                                    select: true,
                                    label: 'Rank',
                                    value: dD,
                                    onChange: function (q3) {
                                      return dL(q3.target.value);
                                    },
                                    sx: {
                                      '& .MuiInput-root': {
                                        color: 'white !important',
                                      },
                                      '& label.Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& Mui-focused': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderColor: 'darkgray !important' },
                                      '& .MuiInput-underline:before': {
                                        borderColor: 'darkgray !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInput-underline:after': {
                                        borderColor: 'white !important',
                                        color: 'darkgray !important',
                                      },
                                      '& .Mui-focused:after': {
                                        color: 'darkgray !important',
                                      },
                                      '& .MuiInputAdornment-root': {
                                        color: 'darkgray !important',
                                      },
                                    },
                                    children: [
                                      Object(PZ.jsx)(
                                        KT.a,
                                        {
                                          value: '1',
                                          children: 'Cadet',
                                        },
                                        '1',
                                      ),
                                      Object(PZ.jsx)(
                                        KT.a,
                                        {
                                          value: '2',
                                          children: 'Officer',
                                        },
                                        '2',
                                      ),
                                      Object(PZ.jsx)(
                                        KT.a,
                                        {
                                          value: '3',
                                          children: 'Senior Officer',
                                        },
                                        '3',
                                      ),
                                      Object(PZ.jsx)(
                                        KT.a,
                                        {
                                          value: '4',
                                          children: 'Corporal',
                                        },
                                        '4',
                                      ),
                                      Object(PZ.jsx)(
                                        KT.a,
                                        {
                                          value: '5',
                                          children: 'Sergeant',
                                        },
                                        '5',
                                      ),
                                      Object(PZ.jsx)(
                                        KT.a,
                                        {
                                          value: '6',
                                          children: 'Lieutenant',
                                        },
                                        '6',
                                      ),
                                      Object(PZ.jsx)(
                                        KT.a,
                                        {
                                          value: '7',
                                          children: 'Captain',
                                        },
                                        '7',
                                      ),
                                      Object(PZ.jsx)(
                                        KT.a,
                                        {
                                          value: '8',
                                          children: 'Deputy Chief Of Police',
                                        },
                                        '8',
                                      ),
                                      Object(PZ.jsx)(
                                        KT.a,
                                        {
                                          value: '9',
                                          children: 'Chief Of Police',
                                        },
                                        '9',
                                      ),
                                    ],
                                  }),
                                }),
                              }),
                            ],
                          }),
                        }),
                      }),
                    ],
                  }),
                  Object(PZ.jsx)('div', {
                    className: dq.mdwInnerContentDivider,
                  }),
                  Object(PZ.jsx)('div', {
                    className: dq.mdwStaffContentWrapperRight,
                    style: { overflowY: 'auto' },
                  }),
                ],
              }),
            }),
          });
        },
        dK = Object(KP.a)({
          components: {
            MuiTypography: { styleOverrides: { root: { margin: '0' } } },
            MuiMenuItem: {
              styleOverrides: {
                root: {
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    '&.Mui-focusVisible': { background: 'rgba(0, 0, 0, 0.3)' },
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                },
              },
            },
            MuiCircularProgress: {
              styleOverrides: { circle: { strokeLinecap: 'butt' } },
            },
            MuiInput: {
              styleOverrides: {
                root: {
                  '& .MuiInput-root': {
                    color: 'white !important',
                    fontSize: '1.3vmin !important',
                  },
                  '& label.Mui-focused': { color: 'darkgray !important' },
                  '& Mui-focused': { color: 'darkgray !important' },
                  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                    borderColor: 'darkgray !important',
                  },
                  '& .MuiInput-underline:before': {
                    borderColor: 'darkgray !important',
                    color: 'darkgray !important',
                  },
                  '& .MuiInput-underline:after': {
                    borderColor: 'white !important',
                    color: 'darkgray !important',
                  },
                  '& .Mui-focused:after': {
                    color: 'darkgray !important',
                    fontSize: '1.5vmin !important',
                  },
                  '& .MuiInputAdornment-root': { color: 'darkgray !important' },
                },
              },
            },
            MuiTooltip: {
              styleOverrides: {
                tooltip: {
                  fontSize: '1em',
                  maxWidth: '1000px',
                },
              },
            },
          },
          palette: {
            mode: 'dark',
            primary: { main: '#95ef77' },
            secondary: { main: '#424cab' },
            success: { main: '#95ef77' },
            warning: { main: '#f2a365' },
            error: { main: '#ffffff' },
            info: { main: '#2d465b' },
          },
        }),
        dP = function () {
          var dq = PE(),
            dU = Object(K4.useState)(false),
            dQ = Object(KK.a)(dU, 2),
            dh = dQ[0],
            dX = dQ[1],
            dI = Object(Ki.f)(),
            dS = Object(Kb.c)(Kt),
            dg = Object(KK.a)(dS, 2),
            dj = dg[0],
            dk = dg[1],
            dB = Object(Kb.c)(KO),
            dE = Object(KK.a)(dB, 2),
            dT = dE[0],
            dZ = dE[1],
            dx = Object(Kb.c)(KC),
            dA = Object(KK.a)(dx, 2),
            dm = dA[0],
            df = dA[1],
            db = Object(Kb.c)(Kz),
            dM = Object(KK.a)(db, 2),
            dv = dM[0],
            dw = dM[1],
            du = Object(Kb.c)(KN),
            dH = Object(KK.a)(du, 2),
            dG = (dH[0], dH[1]),
            dy = Object(Kb.c)(KM),
            dp = Object(KK.a)(dy, 2),
            dV = dp[0],
            dF = dp[1],
            dc = Object(K4.useState)(1),
            dJ = Object(KK.a)(dc, 2),
            dl = dJ[0],
            dY = dJ[1],
            dD = Object(K4.useState)([]),
            dL = Object(KK.a)(dD, 2),
            dR = (dL[0], dL[1]),
            ds = Object(Kb.c)(KJ),
            dO = Object(KK.a)(ds, 2),
            dC = (dO[0], dO[1]),
            dz = Object(Kb.c)(Kl),
            dN = Object(KK.a)(dz, 2),
            dW = (dN[0], dN[1]),
            q0 = Object(K4.useState)([]),
            q1 = Object(KK.a)(q0, 2),
            q2 = q1[0],
            q3 = q1[1],
            q4 = Object(K4.useState)([]),
            q5 = Object(KK.a)(q4, 2),
            q6 = q5[0],
            q7 = q5[1],
            q8 = Object(Kb.c)(Ko),
            q9 = Object(KK.a)(q8, 2),
            qK = (q9[0], q9[1]),
            qP = Object(Kb.c)(KV),
            qd = Object(KK.a)(qP, 2),
            qq = (qd[0], qd[1]),
            qU = Object(Kb.c)(Kn),
            qQ = Object(KK.a)(qU, 2),
            qh = (qQ[0], qQ[1]),
            qX = Object(Kb.c)(Ky),
            qI = Object(KK.a)(qX, 2),
            qS = (qI[0], qI[1]),
            qg = Object(Kb.c)(Kp),
            qj = Object(KK.a)(qg, 2),
            qk = (qj[0], qj[1]),
            qB = Object(Kb.c)(KW),
            qE = Object(KK.a)(qB, 2),
            qT = (qE[0], qE[1]),
            qZ = Object(Kb.c)(P0),
            qx = Object(KK.a)(qZ, 2),
            qA = (qx[0], qx[1]),
            qm = Object(Kb.c)(PK),
            qf = Object(KK.a)(qm, 2),
            qb = qf[0],
            qM = qf[1],
            qv = Object(Kb.c)(PP),
            qw = Object(KK.a)(qv, 2),
            qu = qw[0],
            qa = qw[1],
            qo = Object(Kb.c)(Pd),
            qH = Object(KK.a)(qo, 2),
            qG = qH[0],
            qy = qH[1],
            qp = Object(Kb.c)(Pq),
            qV = Object(KK.a)(qp, 2),
            qF = qV[0],
            qc = qV[1],
            qJ = Object(Kb.c)(P9),
            ql = Object(KK.a)(qJ, 2),
            qY = ql[0],
            qD = ql[1],
            qL = Object(Kb.c)(KF),
            qR = Object(KK.a)(qL, 2),
            qs = (qR[0], qR[1]),
            qO = Object(Kb.c)(KY),
            qC = Object(KK.a)(qO, 2),
            qz = qC[0],
            qN = qC[1],
            qW = Object(Kb.c)(KH),
            U0 = Object(KK.a)(qW, 2),
            U1 = U0[0],
            U2 = (U0[1], Object(Kb.c)(Pj)),
            U3 = Object(KK.a)(U2, 2),
            U4 = U3[0],
            U5 = (U3[1], Object(Kb.c)(P3)),
            U6 = Object(KK.a)(U5, 2),
            U7 = U6[0],
            U8 = (U6[1], Object(Kb.c)(P4)),
            U9 = Object(KK.a)(U8, 2),
            UK = U9[0],
            UP = U9[1],
            Ud = Object(Kb.c)(P5),
            Uq = Object(KK.a)(Ud, 2),
            UU = Uq[0],
            UQ = Uq[1],
            Uh = Object(Kb.c)(P6),
            UX = Object(KK.a)(Uh, 2),
            UI = UX[0],
            US = UX[1],
            Ug = Object(Kb.c)(P7),
            Uj = Object(KK.a)(Ug, 2),
            Uk = Uj[0],
            UB = Uj[1],
            UE = Object(Kb.c)(P8),
            UT = Object(KK.a)(UE, 2),
            UZ = UT[0],
            Ux = UT[1],
            UA = Object(K4.useState)(false),
            Um = Object(KK.a)(UA, 2),
            Uf = (Um[0], Um[1]),
            Ub = Object(Kb.c)(Kv),
            UM = Object(KK.a)(Ub, 2),
            Uv = UM[0],
            Uw = UM[1],
            Uu = Object(Kb.c)(PU),
            Ua = Object(KK.a)(Uu, 2),
            Uo = Ua[0],
            UH = Ua[1],
            UG = Object(Kb.c)(PQ),
            Uy = Object(KK.a)(UG, 2),
            Up = Uy[0],
            UV = Uy[1],
            UF = Object(Kb.c)(Ph),
            Uc = Object(KK.a)(UF, 2),
            UJ = Uc[0],
            Ul = Uc[1],
            UY = Object(Kb.c)(PX),
            UD = Object(KK.a)(UY, 2),
            UL = UD[0],
            UR = UD[1],
            Us = Object(Kb.c)(PI),
            UO = Object(KK.a)(Us, 2),
            UC = UO[0],
            Uz = UO[1],
            UN = Object(Kb.c)(PS),
            UW = Object(KK.a)(UN, 2),
            Q0 = UW[0],
            Q1 = UW[1],
            Q2 = Object(Kb.c)(Pg),
            Q3 = Object(KK.a)(Q2, 2),
            Q4 = Q3[0],
            Q5 = Q3[1],
            Q6 = Object(Kb.c)(Kw),
            Q7 = Object(KK.a)(Q6, 2),
            Q8 = Q7[0],
            Q9 = Q7[1],
            QK = Object(Kb.c)(Ku),
            QP = Object(KK.a)(QK, 2),
            Qd = QP[0],
            Qq = QP[1],
            QU = Object(Kb.c)(Ka),
            QQ = Object(KK.a)(QU, 2),
            Qh = QQ[0],
            QX = QQ[1],
            QI = Object(K4.useState)(false),
            QS = Object(KK.a)(QI, 2),
            Qg = QS[0],
            Qj = QS[1],
            Qk = Object(K4.useState)(''),
            QB = Object(KK.a)(Qk, 2),
            QE = QB[0],
            QT = QB[1],
            QZ = Object(K4.useState)(''),
            Qx = Object(KK.a)(QZ, 2),
            QA = Qx[0],
            Qm = Qx[1],
            Qf = Object(K4.useState)(''),
            Qb = Object(KK.a)(Qf, 2),
            QM = Qb[0],
            Qv = Qb[1],
            Qw = Object(K4.useState)(''),
            Qu = Object(KK.a)(Qw, 2),
            Qa = Qu[0],
            Qo = Qu[1],
            QH = Object(Kb.c)(KG),
            QG = Object(KK.a)(QH, 2),
            Qy = QG[0],
            Qp = (QG[1], Object(Kb.c)(KD)),
            QV = Object(KK.a)(Qp, 2),
            QF = (QV[0], QV[1]),
            Qc = Object(Kb.c)(KL),
            QJ = Object(KK.a)(Qc, 2),
            Ql = (QJ[0], QJ[1]),
            QY = Object(K4.useState)(''),
            QD = Object(KK.a)(QY, 2),
            QL = QD[0],
            QR = QD[1],
            Qs = Object(K4.useState)(''),
            QO = Object(KK.a)(Qs, 2),
            QC = QO[0],
            Qz = QO[1],
            QN = Object(K4.useState)(null),
            QW = Object(KK.a)(QN, 2),
            h0 = QW[0],
            h1 = QW[1],
            h2 = Object(Kb.c)(KR),
            h3 = Object(KK.a)(h2, 2),
            h4 = (h3[0], h3[1]),
            h5 = Object(Kb.c)(Ks),
            h6 = Object(KK.a)(h5, 2),
            h7 = (h6[0], h6[1]),
            h8 = Object(K4.useState)(''),
            h9 = Object(KK.a)(h8, 2),
            hK = h9[0],
            hP = h9[1],
            hd = Object(K4.useState)(''),
            hq = Object(KK.a)(hd, 2),
            hU = hq[0],
            hQ = hq[1],
            hh = Object(K4.useState)(''),
            hX = Object(KK.a)(hh, 2),
            hI = hX[0],
            hS = hX[1],
            hg = Object(K4.useState)(''),
            hj = Object(KK.a)(hg, 2),
            hk = hj[0],
            hB = hj[1],
            hE = Object(Kb.c)(Pr),
            hT = Object(KK.a)(hE, 2),
            hZ = hT[0],
            hx = hT[1];
          Object(K4.useEffect)(function () {
            Kq()
              ? (dk('Joe'), dZ('Mama'), df('9'), dw('Chief of Police'), dG('123'))
              : KS('fetchUserInfo', {}).then(function (ha) {
                  dk(ha.data.first);
                  dZ(ha.data.last);
                  df(ha.data.rank);
                  dw(ha.data.label);
                  dG(ha.data.callsign);
                });
          });
          KQ('openMDW', function (hu) {
            true === hu.show
              ? (hu.publicApp && (dY(3), dI.push('/profiles')),
                Qj(false),
                Uf(false),
                Uw(false),
                UH(false),
                Q9(false),
                Qq(false),
                QX(false),
                UV(false),
                Ul(false),
                Uz(false),
                Q1(false),
                Q5(false),
                dX(true),
                dF(hu.publicApp),
                hx(hu.job),
                hu.publicApp || (1 === dl && dI.push('/dashboard')))
              : false === hu.show && dX(false);
          });
          var hA = function (hu) {
              for (var ho = '', hH = '0123456789', hG = hH.length, hy = 0; hy < hu; hy++) {
                ho += hH.charAt(Math.floor(Math.random() * hG));
              }
              return ho;
            },
            hm = function (hu) {
              dY(hu);
              qT([]);
              qA([]);
              qS([]);
              qk([]);
              qN([]);
              qs([]);
              qq([]);
              qh([]);
              dR([]);
              dC([]);
              dW([]);
              h4([]);
              h7([]);
            },
            hf = function () {
              qN([]), Q5(false);
            },
            hb = function (hu) {
              return Number(hu).toLocaleString('en-Us', {
                style: 'currency',
                currency: 'USD',
              });
            },
            hM = function (hu) {
              return !hk || hu.toString().toLowerCase().includes(hk.toString().toLowerCase());
            },
            hv = qz
              .map(function (hu) {
                return Object(K8.a)(
                  Object(K8.a)({}, hu),
                  {},
                  {
                    charges: hu.charges.filter(function (ho) {
                      return hM(ho.title);
                    }),
                  },
                );
              })
              .filter(function (hu) {
                return hu.charges.length;
              });
          return (
            Kr(dX),
            Object(PZ.jsx)(PZ.Fragment, {
              children: Object(PZ.jsxs)(Kd.a, {
                theme: dK,
                children: [
                  Object(PZ.jsx)(d6, {}),
                  Object(PZ.jsx)('div', {
                    id: 'main-app-container',
                    children: Object(PZ.jsx)('div', {
                      className: dq.mdwOuterContainer,
                      style: {
                        visibility: dh ? 'visible' : 'hidden',
                        opacity: Qg ? '0.5' : '1',
                      },
                      children: Object(PZ.jsxs)('div', {
                        className: dq.mdwInnerContainer,
                        style: {
                          top: dh ? 'calc(8.5% - 72px)' : 'calc(100vh + 32px)',
                        },
                        children: [
                          Object(PZ.jsx)(Px, { show: Uv }),
                          Object(PZ.jsx)(Pi, {
                            show: Q8,
                            confirm: function () {
                              Q9(false),
                                Uw(true),
                                KS('ev-mdw:assignLicense', {
                                  cid: U1,
                                  type: Qy,
                                }).then(function (ho) {
                                  var hG;
                                  hG = U1;
                                  Uw(true);
                                  KS('ev-mdw:loadProfile', {
                                    value: hG,
                                  }).then(function (hy) {
                                    qK(hy.data.licenses);
                                    Uw(false);
                                  });
                                  Uw(false);
                                });
                            },
                            close: function () {
                              return Q9(false);
                            },
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwHireOfficerModalContainer,
                            style: { display: Qh ? '' : 'none' },
                            children: Object(PZ.jsx)('div', {
                              className: dq.mdwHireOfficerModalInnerContainer,
                              children: Object(PZ.jsxs)('div', {
                                className: 'mdw-details',
                                style: {
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignContent: 'space-between',
                                  position: 'relative',
                                  justifyContent: 'space-between',
                                  flex: '1 1',
                                  overflow: 'hidden',
                                },
                                children: [
                                  Object(PZ.jsxs)('div', {
                                    className: 'mdw-desc',
                                    children: [
                                      Object(PZ.jsx)('div', {
                                        className: 'flex-row',
                                        style: {
                                          display: 'flex',
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                          justifyContent: 'flex-start',
                                          padding: '15px',
                                        },
                                        children: Object(PZ.jsx)(Pk.a, {
                                          style: {
                                            color: '#fff',
                                            wordBreak: 'break-word',
                                          },
                                          variant: 'body1',
                                          gutterBottom: true,
                                          children: 'Hire Staff',
                                        }),
                                      }),
                                      Object(PZ.jsxs)('div', {
                                        className: 'flex-row',
                                        style: {
                                          display: 'flex',
                                          alignItems: 'center',
                                          flexDirection: 'column',
                                          justifyContent: 'center',
                                          padding: '8px',
                                          paddingBottom: '0px',
                                        },
                                        children: [
                                          Object(PZ.jsx)(Kk.a, {
                                            fullWidth: true,
                                            sx: {
                                              width: '96%',
                                              marginBottom: '5%',
                                            },
                                            children: Object(PZ.jsx)(KB.a, {
                                              sx: {
                                                '& .MuiInput-root': {
                                                  color: 'white !important',
                                                },
                                                '& label.Mui-focused': {
                                                  color: 'darkgray !important',
                                                },
                                                '& Mui-focused': {
                                                  color: 'darkgray !important',
                                                },
                                                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                  borderColor: 'darkgray !important',
                                                },
                                                '& .MuiInput-underline:before': {
                                                  borderColor: 'darkgray !important',
                                                  color: 'darkgray !important',
                                                },
                                                '& .MuiInput-underline:after': {
                                                  borderColor: 'white !important',
                                                  color: 'darkgray !important',
                                                },
                                                '& .Mui-focused:after': {
                                                  color: 'darkgray !important',
                                                },
                                                '& .MuiInputAdornment-root': {
                                                  color: 'darkgray !important',
                                                },
                                              },
                                              id: 'input-with-icon-textfield',
                                              label: 'State ID',
                                              variant: 'standard',
                                              value: hK,
                                              onChange: function (hu) {
                                                return hP(hu.target.value);
                                              },
                                              InputProps: {
                                                startAdornment: Object(PZ.jsx)(KE.a, {
                                                  position: 'start',
                                                  children: Object(PZ.jsx)('i', {
                                                    className: 'fas fa-id-card fa-w-16 fa-fw',
                                                  }),
                                                }),
                                              },
                                            }),
                                          }),
                                          Object(PZ.jsx)(Kk.a, {
                                            fullWidth: true,
                                            sx: {
                                              width: '96%',
                                              marginBottom: '5%',
                                            },
                                            children: Object(PZ.jsx)(KB.a, {
                                              sx: {
                                                '& .MuiInput-root': {
                                                  color: 'white !important',
                                                },
                                                '& label.Mui-focused': {
                                                  color: 'darkgray !important',
                                                },
                                                '& Mui-focused': {
                                                  color: 'darkgray !important',
                                                },
                                                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                  borderColor: 'darkgray !important',
                                                },
                                                '& .MuiInput-underline:before': {
                                                  borderColor: 'darkgray !important',
                                                  color: 'darkgray !important',
                                                },
                                                '& .MuiInput-underline:after': {
                                                  borderColor: 'white !important',
                                                  color: 'darkgray !important',
                                                },
                                                '& .Mui-focused:after': {
                                                  color: 'darkgray !important',
                                                },
                                                '& .MuiInputAdornment-root': {
                                                  color: 'darkgray !important',
                                                },
                                              },
                                              id: 'input-with-icon-textfield',
                                              label: 'Callsign',
                                              variant: 'standard',
                                              value: hU,
                                              onChange: function (hu) {
                                                return hQ(hu.target.value);
                                              },
                                              InputProps: {
                                                startAdornment: Object(PZ.jsx)(KE.a, {
                                                  position: 'start',
                                                  children: Object(PZ.jsx)('i', {
                                                    className: 'fas fa-clipboard fa-w-16 fa-fw',
                                                  }),
                                                }),
                                              },
                                            }),
                                          }),
                                          Object(PZ.jsx)(Kk.a, {
                                            fullWidth: true,
                                            sx: {
                                              width: '96%',
                                              marginBottom: '5%',
                                            },
                                            children: Object(PZ.jsxs)(KB.a, {
                                              id: 'outlined-select-currency',
                                              variant: 'standard',
                                              select: true,
                                              label: 'Rank',
                                              value: hI,
                                              onChange: function (hu) {
                                                return hS(hu.target.value);
                                              },
                                              sx: {
                                                '& .MuiInput-root': {
                                                  color: 'white !important',
                                                },
                                                '& label.Mui-focused': {
                                                  color: 'darkgray !important',
                                                },
                                                '& Mui-focused': {
                                                  color: 'darkgray !important',
                                                },
                                                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                  borderColor: 'darkgray !important',
                                                },
                                                '& .MuiInput-underline:before': {
                                                  borderColor: 'darkgray !important',
                                                  color: 'darkgray !important',
                                                },
                                                '& .MuiInput-underline:after': {
                                                  borderColor: 'white !important',
                                                  color: 'darkgray !important',
                                                },
                                                '& .Mui-focused:after': {
                                                  color: 'darkgray !important',
                                                },
                                                '& .MuiInputAdornment-root': {
                                                  color: 'darkgray !important',
                                                },
                                              },
                                              children: [
                                                Object(PZ.jsx)(
                                                  KT.a,
                                                  {
                                                    value: '1',
                                                    children: 'Cadet',
                                                  },
                                                  '1',
                                                ),
                                                Object(PZ.jsx)(
                                                  KT.a,
                                                  {
                                                    value: '2',
                                                    children: 'Officer',
                                                  },
                                                  '2',
                                                ),
                                                Object(PZ.jsx)(
                                                  KT.a,
                                                  {
                                                    value: '3',
                                                    children: 'Senior Officer',
                                                  },
                                                  '3',
                                                ),
                                                Object(PZ.jsx)(
                                                  KT.a,
                                                  {
                                                    value: '4',
                                                    children: 'Corporal',
                                                  },
                                                  '4',
                                                ),
                                                Object(PZ.jsx)(
                                                  KT.a,
                                                  {
                                                    value: '5',
                                                    children: 'Sergeant',
                                                  },
                                                  '5',
                                                ),
                                                Object(PZ.jsx)(
                                                  KT.a,
                                                  {
                                                    value: '6',
                                                    children: 'Lieutenant',
                                                  },
                                                  '6',
                                                ),
                                                Object(PZ.jsx)(
                                                  KT.a,
                                                  {
                                                    value: '7',
                                                    children: 'Captain',
                                                  },
                                                  '7',
                                                ),
                                                Object(PZ.jsx)(
                                                  KT.a,
                                                  {
                                                    value: '8',
                                                    children: 'Deputy Chief Of Police',
                                                  },
                                                  '8',
                                                ),
                                                Object(PZ.jsx)(
                                                  KT.a,
                                                  {
                                                    value: '9',
                                                    children: 'Chief Of Police',
                                                  },
                                                  '9',
                                                ),
                                              ],
                                            }),
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  Object(PZ.jsx)('div', {
                                    className: 'mdw-alignbottom',
                                    style: {
                                      display: 'flex',
                                      justifyContent: 'flex-end',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      padding: '8px',
                                      marginTop: '1%',
                                    },
                                    children: Object(PZ.jsxs)(KZ.a, {
                                      direction: 'row',
                                      spacing: 1,
                                      children: [
                                        Object(PZ.jsx)('div', {
                                          children: Object(PZ.jsx)(Kx.a, {
                                            onClick: function () {
                                              QX(false),
                                                Uw(true),
                                                KS('ev-mdw:hireStaff', {
                                                  cid: hK,
                                                  callsign: hU,
                                                  rank: hI,
                                                }).then(function (ho) {
                                                  hP('');
                                                  hQ('');
                                                  hS('');
                                                  h4(ho.data);
                                                  h7(ho.data);
                                                  Uw(false);
                                                });
                                            },
                                            size: 'small',
                                            color: 'success',
                                            variant: 'contained',
                                            children: 'Save',
                                          }),
                                        }),
                                        Object(PZ.jsx)('div', {
                                          children: Object(PZ.jsx)(Kx.a, {
                                            onClick: function () {
                                              return QX(false);
                                            },
                                            size: 'small',
                                            color: 'warning',
                                            variant: 'contained',
                                            children: 'Close',
                                          }),
                                        }),
                                      ],
                                    }),
                                  }),
                                ],
                              }),
                            }),
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwCreateWarrantModalContainer,
                            style: { display: Qd ? '' : 'none' },
                            children: Object(PZ.jsx)('div', {
                              className: dq.mdwCreateWarrantModalInnerContainer,
                              children: Object(PZ.jsxs)('div', {
                                className: 'mdw-details',
                                style: {
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignContent: 'space-between',
                                  position: 'relative',
                                  justifyContent: 'space-between',
                                  flex: '1 1',
                                  overflow: 'hidden',
                                },
                                children: [
                                  Object(PZ.jsxs)('div', {
                                    className: 'mdw-desc',
                                    children: [
                                      Object(PZ.jsx)('div', {
                                        className: 'flex-row',
                                        style: {
                                          display: 'flex',
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                          justifyContent: 'flex-start',
                                          padding: '15px',
                                        },
                                        children: Object(PZ.jsx)(Pk.a, {
                                          style: {
                                            color: '#fff',
                                            wordBreak: 'break-word',
                                          },
                                          variant: 'body1',
                                          gutterBottom: true,
                                          children: 'Create Warrant',
                                        }),
                                      }),
                                      Object(PZ.jsxs)('div', {
                                        className: 'flex-row',
                                        style: {
                                          display: 'flex',
                                          alignItems: 'center',
                                          flexDirection: 'column',
                                          justifyContent: 'center',
                                          padding: '8px',
                                          paddingBottom: '0px',
                                        },
                                        children: [
                                          Object(PZ.jsx)(Kk.a, {
                                            fullWidth: true,
                                            sx: {
                                              width: '96%',
                                              marginBottom: '5%',
                                            },
                                            children: Object(PZ.jsx)(KB.a, {
                                              sx: {
                                                '& .MuiInput-root': {
                                                  color: 'white !important',
                                                },
                                                '& label.Mui-focused': {
                                                  color: 'darkgray !important',
                                                },
                                                '& Mui-focused': {
                                                  color: 'darkgray !important',
                                                },
                                                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                  borderColor: 'darkgray !important',
                                                },
                                                '& .MuiInput-underline:before': {
                                                  borderColor: 'darkgray !important',
                                                  color: 'darkgray !important',
                                                },
                                                '& .MuiInput-underline:after': {
                                                  borderColor: 'white !important',
                                                  color: 'darkgray !important',
                                                },
                                                '& .Mui-focused:after': {
                                                  color: 'darkgray !important',
                                                },
                                                '& .MuiInputAdornment-root': {
                                                  color: 'darkgray !important',
                                                },
                                              },
                                              id: 'input-with-icon-textfield',
                                              label: 'State ID',
                                              variant: 'standard',
                                              value: QL,
                                              onChange: function (hu) {
                                                return QR(hu.target.value);
                                              },
                                              InputProps: {
                                                startAdornment: Object(PZ.jsx)(KE.a, {
                                                  position: 'start',
                                                  children: Object(PZ.jsx)('i', {
                                                    className: 'fas fa-id-card fa-w-16 fa-fw',
                                                  }),
                                                }),
                                              },
                                            }),
                                          }),
                                          Object(PZ.jsx)(Kk.a, {
                                            fullWidth: true,
                                            sx: {
                                              width: '96%',
                                              marginBottom: '5%',
                                            },
                                            children: Object(PZ.jsx)(KB.a, {
                                              sx: {
                                                '& .MuiInput-root': {
                                                  color: 'white !important',
                                                },
                                                '& label.Mui-focused': {
                                                  color: 'darkgray !important',
                                                },
                                                '& Mui-focused': {
                                                  color: 'darkgray !important',
                                                },
                                                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                  borderColor: 'darkgray !important',
                                                },
                                                '& .MuiInput-underline:before': {
                                                  borderColor: 'darkgray !important',
                                                  color: 'darkgray !important',
                                                },
                                                '& .MuiInput-underline:after': {
                                                  borderColor: 'white !important',
                                                  color: 'darkgray !important',
                                                },
                                                '& .Mui-focused:after': {
                                                  color: 'darkgray !important',
                                                },
                                                '& .MuiInputAdornment-root': {
                                                  color: 'darkgray !important',
                                                },
                                              },
                                              id: 'input-with-icon-textfield',
                                              label: 'Incident ID (0 if none)',
                                              variant: 'standard',
                                              value: QC,
                                              onChange: function (hu) {
                                                return Qz(hu.target.value);
                                              },
                                              InputProps: {
                                                startAdornment: Object(PZ.jsx)(KE.a, {
                                                  position: 'start',
                                                  children: Object(PZ.jsx)('i', {
                                                    className: 'fas fa-pen fa-w-16 fa-fw',
                                                  }),
                                                }),
                                              },
                                            }),
                                          }),
                                          Object(PZ.jsx)(Kk.a, {
                                            fullWidth: true,
                                            sx: {
                                              width: '96%',
                                              marginBottom: '5%',
                                              '& .MuiInput-root': {
                                                color: 'white !important',
                                              },
                                              '& label.Mui-focused': {
                                                color: 'darkgray !important',
                                              },
                                              '& Mui-focused': {
                                                color: 'darkgray !important',
                                              },
                                              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                borderColor: 'darkgray !important',
                                              },
                                              '& .MuiInput-underline:before': {
                                                borderColor: 'darkgray !important',
                                                color: 'darkgray !important',
                                              },
                                              '& .MuiInput-underline:after': {
                                                borderColor: 'white !important',
                                                color: 'darkgray !important',
                                              },
                                              '& .Mui-focused:after': {
                                                color: 'darkgray !important',
                                              },
                                              '& .MuiInputAdornment-root': {
                                                color: 'darkgray !important',
                                              },
                                            },
                                            children: Object(PZ.jsx)(Pc.b, {
                                              dateAdapter: PF.a,
                                              children: Object(PZ.jsx)(d7.a, {
                                                label: 'Expiration Date',
                                                value: h0,
                                                onChange: function (hu) {
                                                  h1(hu);
                                                },
                                                renderInput: function (hu) {
                                                  return Object(PZ.jsx)(KB.a, Object(K8.a)({ variant: 'standard' }, hu));
                                                },
                                              }),
                                            }),
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  Object(PZ.jsx)('div', {
                                    className: 'mdw-alignbottom',
                                    style: {
                                      display: 'flex',
                                      justifyContent: 'flex-end',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      padding: '8px',
                                      marginTop: '1%',
                                    },
                                    children: Object(PZ.jsxs)(KZ.a, {
                                      direction: 'row',
                                      spacing: 1,
                                      children: [
                                        Object(PZ.jsx)('div', {
                                          children: Object(PZ.jsx)(Kx.a, {
                                            onClick: function () {
                                              Qq(false);
                                              Uw(true);
                                              var ha = h0;
                                              null !== h0 && (ha = Pu()(h0).format('X'));
                                              KS('ev-mdw:createWarrant', {
                                                cid: QL,
                                                incidentId: QC,
                                                expiry: ha,
                                              }).then(function (hH) {
                                                QR('');
                                                Qz('');
                                                h1(null);
                                                QF(hH.data);
                                                Ql(hH.data);
                                                Uw(false);
                                              });
                                            },
                                            size: 'small',
                                            color: 'success',
                                            variant: 'contained',
                                            children: 'Save',
                                          }),
                                        }),
                                        Object(PZ.jsx)('div', {
                                          children: Object(PZ.jsx)(Kx.a, {
                                            onClick: function () {
                                              return Qq(false);
                                            },
                                            size: 'small',
                                            color: 'warning',
                                            variant: 'contained',
                                            children: 'Close',
                                          }),
                                        }),
                                      ],
                                    }),
                                  }),
                                ],
                              }),
                            }),
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwAssignOfficerModalContainer,
                            style: { display: UJ ? '' : 'none' },
                            children: Object(PZ.jsx)('div', {
                              className: dq.mdwAssignOfficerModalInnerContainer,
                              children: Object(PZ.jsxs)('div', {
                                className: dq.mdwIncidentsInnerContentLeft,
                                style: { backgroundColor: 'transparent' },
                                children: [
                                  Object(PZ.jsxs)('div', {
                                    className: dq.mdwIncidentsInnerContentLeftHeader,
                                    style: { padding: '13px' },
                                    children: [
                                      Object(PZ.jsx)('div', {
                                        className: 'mdw-incidents-inner-content-left-header-text-left',
                                        children: Object(PZ.jsx)(Pk.a, {
                                          style: {
                                            color: '#fff',
                                            wordBreak: 'break-word',
                                          },
                                          variant: 'body2',
                                          gutterBottom: true,
                                          children: 'Assign Officer',
                                        }),
                                      }),
                                      Object(PZ.jsx)('div', {
                                        className: dq.mdwInnerContentLeftHeaderTextRight,
                                      }),
                                    ],
                                  }),
                                  Object(PZ.jsx)('div', {
                                    className: dq.mdwInnerContentLeftBody,
                                    style: {
                                      padding: '0px',
                                      paddingLeft: '13px',
                                      paddingRight: '13px',
                                      marginBottom: '1%',
                                    },
                                    children: Object(PZ.jsx)('div', {
                                      className: 'input-wrapper',
                                      children: Object(PZ.jsx)(Kk.a, {
                                        fullWidth: true,
                                        sx: { width: '100%' },
                                        children: Object(PZ.jsx)(KB.a, {
                                          sx: {
                                            '& .MuiInput-root': {
                                              color: 'white !important',
                                            },
                                            '& label.Mui-focused': {
                                              color: 'darkgray !important',
                                            },
                                            '& Mui-focused': {
                                              color: 'darkgray !important',
                                            },
                                            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                              borderColor: 'darkgray !important',
                                            },
                                            '& .MuiInput-underline:before': {
                                              borderColor: 'darkgray !important',
                                              color: 'darkgray !important',
                                            },
                                            '& .MuiInput-underline:after': {
                                              borderColor: 'white !important',
                                              color: 'darkgray !important',
                                            },
                                            '& .Mui-focused:after': {
                                              color: 'darkgray !important',
                                            },
                                            '& .MuiInputAdornment-root': {
                                              color: 'darkgray !important',
                                            },
                                          },
                                          id: 'input-with-icon-textfield',
                                          label: 'Search',
                                          variant: 'standard',
                                          onChange: function (hu) {
                                            return (function (ha) {
                                              if ('' !== ha) {
                                                var hH = qb.filter(function (hy) {
                                                  return (
                                                    hy.cid.toString().toLowerCase().startsWith(ha.toLowerCase()) ||
                                                    hy.name.toString().toLowerCase().startsWith(ha.toLowerCase()) ||
                                                    hy.callsign.toString().toLowerCase().startsWith(ha.toLowerCase())
                                                  );
                                                });
                                                qa(hH);
                                              } else {
                                                qa(qb);
                                              }
                                            })(hu.target.value);
                                          },
                                          InputProps: {
                                            startAdornment: Object(PZ.jsx)(KE.a, {
                                              position: 'start',
                                              children: Object(PZ.jsx)('i', {
                                                className: 'fas fa-search fa-w-16 fa-fw',
                                              }),
                                            }),
                                          },
                                        }),
                                      }),
                                    }),
                                  }),
                                  Object(PZ.jsx)('div', {
                                    className: dq.mdwInnerContentLeftBody,
                                    style: {
                                      padding: '0px',
                                      paddingLeft: '5px',
                                      paddingRight: '5px',
                                    },
                                    children: Object(PZ.jsx)('div', {
                                      className: dq.mdwAssignOfficerChipWrapper,
                                      style: {
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        flex: '0 !important',
                                        height: '163px',
                                        maxHeight: '163px',
                                        overflow: 'auto',
                                      },
                                      children:
                                        qu && qu.length > 0
                                          ? qu.map(function (hu) {
                                              return Object(PZ.jsx)('div', {
                                                style: {
                                                  paddingRight: '1%',
                                                  paddingBottom: '1.5%',
                                                },
                                                children: Object(PZ.jsx)(KA.a, {
                                                  label: '('.concat(hu.callsign, ') ').concat(hu.name),
                                                  onClick: function () {
                                                    return (function (hH, hG, hy) {
                                                      var hp = {
                                                          cid: hH,
                                                          name: hG,
                                                          callsign: hy,
                                                        },
                                                        hV = [].concat(Object(K9.a)(UU || []), [hp]);
                                                      UQ(hV);
                                                      var hF = qb.filter(function (hc) {
                                                        return hc.id.toString() !== hH.toString();
                                                      });
                                                      qM(hF);
                                                      qa(hF);
                                                    })(hu.cid, hu.name, hu.callsign);
                                                  },
                                                  sx: {
                                                    backgroundColor: '#fff',
                                                    color: '#000',
                                                  },
                                                }),
                                              });
                                            })
                                          : Object(PZ.jsx)(PZ.Fragment, {}),
                                    }),
                                  }),
                                  Object(PZ.jsx)('div', {
                                    className: dq.mdwIncidentsInnerContentLeftHeader,
                                    style: {
                                      padding: '13px',
                                      marginTop: '17.1%',
                                      justifyContent: 'center',
                                      display: Uo ? 'none' : '',
                                    },
                                    children: Object(PZ.jsx)('div', {
                                      children: Object(PZ.jsx)(Kx.a, {
                                        onClick: function () {
                                          qM([]);
                                          qa([]);
                                          Ul(false);
                                        },
                                        size: 'small',
                                        color: 'warning',
                                        variant: 'contained',
                                        children: 'Close',
                                      }),
                                    }),
                                  }),
                                ],
                              }),
                            }),
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwAssignEmsModalContainer,
                            style: { display: UL ? '' : 'none' },
                            children: Object(PZ.jsx)('div', {
                              className: dq.mdwAssignEmsModalInnerContainer,
                              children: Object(PZ.jsxs)('div', {
                                className: dq.mdwIncidentsInnerContentLeft,
                                style: { backgroundColor: 'transparent' },
                                children: [
                                  Object(PZ.jsxs)('div', {
                                    className: dq.mdwIncidentsInnerContentLeftHeader,
                                    style: { padding: '13px' },
                                    children: [
                                      Object(PZ.jsx)('div', {
                                        className: 'mdw-incidents-inner-content-left-header-text-left',
                                        children: Object(PZ.jsx)(Pk.a, {
                                          style: {
                                            color: '#fff',
                                            wordBreak: 'break-word',
                                          },
                                          variant: 'body2',
                                          gutterBottom: true,
                                          children: 'Assign EMS',
                                        }),
                                      }),
                                      Object(PZ.jsx)('div', {
                                        className: dq.mdwInnerContentLeftHeaderTextRight,
                                      }),
                                    ],
                                  }),
                                  Object(PZ.jsx)('div', {
                                    className: dq.mdwInnerContentLeftBody,
                                    style: {
                                      padding: '0px',
                                      paddingLeft: '13px',
                                      paddingRight: '13px',
                                      marginBottom: '1%',
                                    },
                                    children: Object(PZ.jsx)('div', {
                                      className: 'input-wrapper',
                                      children: Object(PZ.jsx)(Kk.a, {
                                        fullWidth: true,
                                        sx: { width: '100%' },
                                        children: Object(PZ.jsx)(KB.a, {
                                          sx: {
                                            '& .MuiInput-root': {
                                              color: 'white !important',
                                            },
                                            '& label.Mui-focused': {
                                              color: 'darkgray !important',
                                            },
                                            '& Mui-focused': {
                                              color: 'darkgray !important',
                                            },
                                            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                              borderColor: 'darkgray !important',
                                            },
                                            '& .MuiInput-underline:before': {
                                              borderColor: 'darkgray !important',
                                              color: 'darkgray !important',
                                            },
                                            '& .MuiInput-underline:after': {
                                              borderColor: 'white !important',
                                              color: 'darkgray !important',
                                            },
                                            '& .Mui-focused:after': {
                                              color: 'darkgray !important',
                                            },
                                            '& .MuiInputAdornment-root': {
                                              color: 'darkgray !important',
                                            },
                                          },
                                          id: 'input-with-icon-textfield',
                                          label: 'Search',
                                          variant: 'standard',
                                          onChange: function (hu) {
                                            return (function (ho) {
                                              if ('' !== ho) {
                                                var hG = qG.filter(function (hp) {
                                                  return (
                                                    hp.cid.toString().toLowerCase().startsWith(ho.toLowerCase()) ||
                                                    hp.name.toString().toLowerCase().startsWith(ho.toLowerCase()) ||
                                                    hp.callsign.toString().toLowerCase().startsWith(ho.toLowerCase())
                                                  );
                                                });
                                                qc(hG);
                                              } else {
                                                qc(qG);
                                              }
                                            })(hu.target.value);
                                          },
                                          InputProps: {
                                            startAdornment: Object(PZ.jsx)(KE.a, {
                                              position: 'start',
                                              children: Object(PZ.jsx)('i', {
                                                className: 'fas fa-search fa-w-16 fa-fw',
                                              }),
                                            }),
                                          },
                                        }),
                                      }),
                                    }),
                                  }),
                                  Object(PZ.jsx)('div', {
                                    className: dq.mdwInnerContentLeftBody,
                                    style: {
                                      padding: '0px',
                                      paddingLeft: '5px',
                                      paddingRight: '5px',
                                    },
                                    children: Object(PZ.jsx)('div', {
                                      className: dq.mdwAssignEmsChipWrapper,
                                      style: {
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        flex: '0 !important',
                                        height: '163px',
                                        maxHeight: '163px',
                                        overflow: 'auto',
                                      },
                                      children:
                                        qF && qF.length > 0
                                          ? qF.map(function (hu) {
                                              return Object(PZ.jsx)('div', {
                                                style: {
                                                  paddingRight: '1%',
                                                  paddingBottom: '1.5%',
                                                },
                                                children: Object(PZ.jsx)(KA.a, {
                                                  label: '('.concat(hu.callsign, ') ').concat(hu.name),
                                                  onClick: function () {
                                                    return (function (hH, hG, hy) {
                                                      var hV = {
                                                          cid: hH,
                                                          name: hG,
                                                          callsign: hy,
                                                        },
                                                        hF = [].concat(Object(K9.a)(UI || []), [hV]);
                                                      US(hF);
                                                      var hc = qb.filter(function (hJ) {
                                                        return hJ.id.toString() !== hH.toString();
                                                      });
                                                      qy(hc);
                                                      qc(hc);
                                                    })(hu.cid, hu.name, hu.callsign);
                                                  },
                                                  sx: {
                                                    backgroundColor: '#fff',
                                                    color: '#000',
                                                  },
                                                }),
                                              });
                                            })
                                          : Object(PZ.jsx)(PZ.Fragment, {}),
                                    }),
                                  }),
                                  Object(PZ.jsx)('div', {
                                    className: dq.mdwIncidentsInnerContentLeftHeader,
                                    style: {
                                      padding: '13px',
                                      marginTop: '17.1%',
                                      justifyContent: 'center',
                                      display: Uo ? 'none' : '',
                                    },
                                    children: Object(PZ.jsx)('div', {
                                      children: Object(PZ.jsx)(Kx.a, {
                                        onClick: function () {
                                          qy([]);
                                          qc([]);
                                          UR(false);
                                        },
                                        size: 'small',
                                        color: 'warning',
                                        variant: 'contained',
                                        children: 'Close',
                                      }),
                                    }),
                                  }),
                                ],
                              }),
                            }),
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwAssignPersonModalContainer,
                            style: { display: UC ? '' : 'none' },
                            children: Object(PZ.jsxs)('div', {
                              className: dq.mdwAssignPersonModalInnerContainer,
                              children: [
                                Object(PZ.jsx)('div', {
                                  className: 'spinnerwrapper',
                                  style: {
                                    display: Uo ? '' : 'none',
                                    marginLeft: '44%',
                                    marginTop: '14%',
                                  },
                                  children: Object(PZ.jsxs)('div', {
                                    className: 'lds-spinner',
                                    children: [
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                    ],
                                  }),
                                }),
                                Object(PZ.jsxs)('div', {
                                  className: dq.mdwIncidentsInnerContentLeft,
                                  style: {
                                    backgroundColor: 'transparent',
                                    display: Uo ? 'none' : '',
                                  },
                                  children: [
                                    Object(PZ.jsx)('div', {
                                      className: dq.mdwInnerContentLeftBody,
                                      style: {
                                        padding: '0px',
                                        paddingLeft: '13px',
                                        paddingRight: '13px',
                                        marginBottom: '1%',
                                        marginTop: '1%',
                                      },
                                      children: Object(PZ.jsx)('div', {
                                        className: 'input-wrapper',
                                        children: Object(PZ.jsx)(Kk.a, {
                                          fullWidth: true,
                                          sx: { width: '100%' },
                                          children: Object(PZ.jsx)(KB.a, {
                                            sx: {
                                              '& .MuiInput-root': {
                                                color: 'white !important',
                                              },
                                              '& label.Mui-focused': {
                                                color: 'darkgray !important',
                                              },
                                              '& Mui-focused': {
                                                color: 'darkgray !important',
                                              },
                                              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                borderColor: 'darkgray !important',
                                              },
                                              '& .MuiInput-underline:before': {
                                                borderColor: 'darkgray !important',
                                                color: 'darkgray !important',
                                              },
                                              '& .MuiInput-underline:after': {
                                                borderColor: 'white !important',
                                                color: 'darkgray !important',
                                              },
                                              '& .Mui-focused:after': {
                                                color: 'darkgray !important',
                                              },
                                              '& .MuiInputAdornment-root': {
                                                color: 'darkgray !important',
                                              },
                                            },
                                            id: 'input-with-icon-textfield',
                                            label: 'Name',
                                            variant: 'standard',
                                            onChange: function (hu) {
                                              var ho;
                                              '' !== (ho = hu.target.value) && void 0 !== ho
                                                ? (q3([]),
                                                  KS('ev-mdw:searchProfiles', {
                                                    value: ho,
                                                  }).then(function (hH) {
                                                    q3(hH.data);
                                                  }))
                                                : q3([]);
                                            },
                                            InputProps: {
                                              startAdornment: Object(PZ.jsx)(KE.a, {
                                                position: 'start',
                                                children: Object(PZ.jsx)('i', {
                                                  className: 'fas fa-user fa-w-16 fa-fw',
                                                }),
                                              }),
                                            },
                                          }),
                                        }),
                                      }),
                                    }),
                                    Object(PZ.jsx)('div', {
                                      className: 'mdw-inner-content-colum-wrap',
                                      style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        maxHeight: '250px',
                                        overflow: 'auto',
                                      },
                                      children:
                                        q2 && q2.length > 0
                                          ? q2.map(function (hu) {
                                              return Object(PZ.jsxs)('div', {
                                                className: dq.mdwInnerContentLeftBody,
                                                style: {
                                                  padding: '0px',
                                                  paddingLeft: '13px',
                                                  paddingRight: '5px',
                                                  flexDirection: 'row',
                                                  overflow: 'unset',
                                                  marginBottom: '1%',
                                                },
                                                children: [
                                                  Object(PZ.jsx)('div', {
                                                    className: dq.mdwCreateImage,
                                                    children: Object(PZ.jsx)('img', {
                                                      alt: '',
                                                      src: 'https://i.imgur.com/wxNT3y2.jpg',
                                                      style: {
                                                        height: '163px',
                                                        width: '185px',
                                                      },
                                                    }),
                                                  }),
                                                  Object(PZ.jsxs)('div', {
                                                    className: 'mdw-create-inputs',
                                                    style: { width: '76.5%' },
                                                    children: [
                                                      Object(PZ.jsx)('div', {
                                                        className: 'input-wrapper',
                                                        style: {
                                                          marginBottom: '2.5%',
                                                        },
                                                        children: Object(PZ.jsx)(Kk.a, {
                                                          fullWidth: true,
                                                          sx: { width: '100%' },
                                                          children: Object(PZ.jsx)(KB.a, {
                                                            sx: {
                                                              '& .MuiInput-root': {
                                                                color: 'white !important',
                                                              },
                                                              '& label.Mui-focused': {
                                                                color: 'darkgray !important',
                                                              },
                                                              '& Mui-focused': {
                                                                color: 'darkgray !important',
                                                              },
                                                              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                                borderColor: 'darkgray !important',
                                                              },
                                                              '& .MuiInput-underline:before': {
                                                                borderColor: 'darkgray !important',
                                                                color: 'darkgray !important',
                                                              },
                                                              '& .MuiInput-underline:after': {
                                                                borderColor: 'white !important',
                                                                color: 'darkgray !important',
                                                              },
                                                              '& .Mui-focused:after': {
                                                                color: 'darkgray !important',
                                                              },
                                                              '& .MuiInputAdornment-root': {
                                                                color: 'darkgray !important',
                                                              },
                                                            },
                                                            id: 'input-with-icon-textfield',
                                                            label: 'State ID',
                                                            variant: 'standard',
                                                            value: hu.id,
                                                            InputProps: {
                                                              readOnly: true,
                                                              startAdornment: Object(PZ.jsx)(KE.a, {
                                                                position: 'start',
                                                                children: Object(PZ.jsx)('i', {
                                                                  className: 'fas fa-id-card fa-w-16 fa-fw',
                                                                }),
                                                              }),
                                                            },
                                                          }),
                                                        }),
                                                      }),
                                                      Object(PZ.jsx)('div', {
                                                        className: 'input-wrapper',
                                                        style: {
                                                          marginBottom: '2.5%',
                                                        },
                                                        children: Object(PZ.jsx)(Kk.a, {
                                                          fullWidth: true,
                                                          sx: { width: '100%' },
                                                          children: Object(PZ.jsx)(KB.a, {
                                                            sx: {
                                                              '& .MuiInput-root': {
                                                                color: 'white !important',
                                                              },
                                                              '& label.Mui-focused': {
                                                                color: 'darkgray !important',
                                                              },
                                                              '& Mui-focused': {
                                                                color: 'darkgray !important',
                                                              },
                                                              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                                borderColor: 'darkgray !important',
                                                              },
                                                              '& .MuiInput-underline:before': {
                                                                borderColor: 'darkgray !important',
                                                                color: 'darkgray !important',
                                                              },
                                                              '& .MuiInput-underline:after': {
                                                                borderColor: 'white !important',
                                                                color: 'darkgray !important',
                                                              },
                                                              '& .Mui-focused:after': {
                                                                color: 'darkgray !important',
                                                              },
                                                              '& .MuiInputAdornment-root': {
                                                                color: 'darkgray !important',
                                                              },
                                                            },
                                                            id: 'input-with-icon-textfield',
                                                            label: 'Name',
                                                            variant: 'standard',
                                                            value: ''.concat(hu.first_name, ' ').concat(hu.last_name),
                                                            InputProps: {
                                                              readOnly: true,
                                                              startAdornment: Object(PZ.jsx)(KE.a, {
                                                                position: 'start',
                                                                children: Object(PZ.jsx)('i', {
                                                                  className: 'fas fa-user fa-w-16 fa-fw',
                                                                }),
                                                              }),
                                                            },
                                                          }),
                                                        }),
                                                      }),
                                                      Object(PZ.jsx)('div', {
                                                        children: Object(PZ.jsx)(Kx.a, {
                                                          onClick: function () {
                                                            return (function (hG, hy, hp) {
                                                              var hV = {
                                                                  cid: hG,
                                                                  name: hy + ' ' + hp,
                                                                },
                                                                hF = [].concat(Object(K9.a)(Uk || []), [hV]);
                                                              UB(hF);
                                                              var hc = q2.filter(function (hl) {
                                                                return hl.id.toString() !== hG.toString();
                                                              });
                                                              q3(hc);
                                                            })(hu.id, hu.first_name, hu.last_name);
                                                          },
                                                          size: 'small',
                                                          color: 'success',
                                                          variant: 'contained',
                                                          children: 'Add',
                                                        }),
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              });
                                            })
                                          : Object(PZ.jsx)(PZ.Fragment, {}),
                                    }),
                                    Object(PZ.jsx)('div', {
                                      className: dq.mdwIncidentsInnerContentLeftHeader,
                                      style: {
                                        padding: '13px',
                                        marginTop: '17.1%',
                                        justifyContent: 'center',
                                        display: Uo ? 'none' : '',
                                      },
                                      children: Object(PZ.jsx)('div', {
                                        children: Object(PZ.jsx)(Kx.a, {
                                          onClick: function () {
                                            q3([]);
                                            Uz(false);
                                          },
                                          size: 'small',
                                          color: 'warning',
                                          variant: 'contained',
                                          children: 'Close',
                                        }),
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwAddCriminalModalContainer,
                            style: { display: Q0 ? '' : 'none' },
                            children: Object(PZ.jsxs)('div', {
                              className: dq.mdwAddCriminalModalInnerContainer,
                              children: [
                                Object(PZ.jsx)('div', {
                                  className: 'spinnerwrapper',
                                  style: {
                                    display: Uo ? '' : 'none',
                                    marginLeft: '44%',
                                    marginTop: '14%',
                                  },
                                  children: Object(PZ.jsxs)('div', {
                                    className: 'lds-spinner',
                                    children: [
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                    ],
                                  }),
                                }),
                                Object(PZ.jsxs)('div', {
                                  className: dq.mdwIncidentsInnerContentLeft,
                                  style: {
                                    backgroundColor: 'transparent',
                                    display: Uo ? 'none' : '',
                                  },
                                  children: [
                                    Object(PZ.jsx)('div', {
                                      className: dq.mdwInnerContentLeftBody,
                                      style: {
                                        padding: '0px',
                                        paddingLeft: '13px',
                                        paddingRight: '13px',
                                        marginBottom: '1%',
                                        marginTop: '1%',
                                      },
                                      children: Object(PZ.jsx)('div', {
                                        className: 'input-wrapper',
                                        children: Object(PZ.jsx)(Kk.a, {
                                          fullWidth: true,
                                          sx: { width: '100%' },
                                          children: Object(PZ.jsx)(KB.a, {
                                            sx: {
                                              '& .MuiInput-root': {
                                                color: 'white !important',
                                              },
                                              '& label.Mui-focused': {
                                                color: 'darkgray !important',
                                              },
                                              '& Mui-focused': {
                                                color: 'darkgray !important',
                                              },
                                              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                borderColor: 'darkgray !important',
                                              },
                                              '& .MuiInput-underline:before': {
                                                borderColor: 'darkgray !important',
                                                color: 'darkgray !important',
                                              },
                                              '& .MuiInput-underline:after': {
                                                borderColor: 'white !important',
                                                color: 'darkgray !important',
                                              },
                                              '& .Mui-focused:after': {
                                                color: 'darkgray !important',
                                              },
                                              '& .MuiInputAdornment-root': {
                                                color: 'darkgray !important',
                                              },
                                            },
                                            id: 'input-with-icon-textfield',
                                            label: 'Name',
                                            variant: 'standard',
                                            onChange: function (hu) {
                                              var ho;
                                              '' !== (ho = hu.target.value) && void 0 !== ho
                                                ? (q7([]),
                                                  KS('ev-mdw:searchProfiles', {
                                                    value: ho,
                                                  }).then(function (hH) {
                                                    q7(hH.data);
                                                  }))
                                                : q7([]);
                                            },
                                            InputProps: {
                                              startAdornment: Object(PZ.jsx)(KE.a, {
                                                position: 'start',
                                                children: Object(PZ.jsx)('i', {
                                                  className: 'fas fa-user fa-w-16 fa-fw',
                                                }),
                                              }),
                                            },
                                          }),
                                        }),
                                      }),
                                    }),
                                    Object(PZ.jsx)('div', {
                                      className: 'mdw-inner-content-colum-wrap',
                                      style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        maxHeight: '250px',
                                        overflow: 'auto',
                                      },
                                      children:
                                        q6 && q6.length > 0
                                          ? q6.map(function (hu) {
                                              return Object(PZ.jsxs)('div', {
                                                className: dq.mdwInnerContentLeftBody,
                                                style: {
                                                  padding: '0px',
                                                  paddingLeft: '13px',
                                                  paddingRight: '5px',
                                                  flexDirection: 'row',
                                                  overflow: 'unset',
                                                  marginBottom: '1%',
                                                },
                                                children: [
                                                  Object(PZ.jsx)('div', {
                                                    className: dq.mdwCreateImage,
                                                    children: Object(PZ.jsx)('img', {
                                                      alt: '',
                                                      src: void 0 !== hu.profilepic ? ''.concat(hu.profilepic) : 'https://i.imgur.com/wxNT3y2.jpg',
                                                      style: {
                                                        height: '163px',
                                                        width: '185px',
                                                      },
                                                    }),
                                                  }),
                                                  Object(PZ.jsxs)('div', {
                                                    className: 'mdw-create-inputs',
                                                    style: { width: '76.5%' },
                                                    children: [
                                                      Object(PZ.jsx)('div', {
                                                        className: 'input-wrapper',
                                                        style: {
                                                          marginBottom: '2.5%',
                                                        },
                                                        children: Object(PZ.jsx)(Kk.a, {
                                                          fullWidth: true,
                                                          sx: { width: '100%' },
                                                          children: Object(PZ.jsx)(KB.a, {
                                                            sx: {
                                                              '& .MuiInput-root': {
                                                                color: 'white !important',
                                                              },
                                                              '& label.Mui-focused': {
                                                                color: 'darkgray !important',
                                                              },
                                                              '& Mui-focused': {
                                                                color: 'darkgray !important',
                                                              },
                                                              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                                borderColor: 'darkgray !important',
                                                              },
                                                              '& .MuiInput-underline:before': {
                                                                borderColor: 'darkgray !important',
                                                                color: 'darkgray !important',
                                                              },
                                                              '& .MuiInput-underline:after': {
                                                                borderColor: 'white !important',
                                                                color: 'darkgray !important',
                                                              },
                                                              '& .Mui-focused:after': {
                                                                color: 'darkgray !important',
                                                              },
                                                              '& .MuiInputAdornment-root': {
                                                                color: 'darkgray !important',
                                                              },
                                                            },
                                                            id: 'input-with-icon-textfield',
                                                            label: 'State ID',
                                                            variant: 'standard',
                                                            value: hu.id,
                                                            InputProps: {
                                                              readOnly: true,
                                                              startAdornment: Object(PZ.jsx)(KE.a, {
                                                                position: 'start',
                                                                children: Object(PZ.jsx)('i', {
                                                                  className: 'fas fa-id-card fa-w-16 fa-fw',
                                                                }),
                                                              }),
                                                            },
                                                          }),
                                                        }),
                                                      }),
                                                      Object(PZ.jsx)('div', {
                                                        className: 'input-wrapper',
                                                        style: {
                                                          marginBottom: '2.5%',
                                                        },
                                                        children: Object(PZ.jsx)(Kk.a, {
                                                          fullWidth: true,
                                                          sx: { width: '100%' },
                                                          children: Object(PZ.jsx)(KB.a, {
                                                            sx: {
                                                              '& .MuiInput-root': {
                                                                color: 'white !important',
                                                              },
                                                              '& label.Mui-focused': {
                                                                color: 'darkgray !important',
                                                              },
                                                              '& Mui-focused': {
                                                                color: 'darkgray !important',
                                                              },
                                                              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                                borderColor: 'darkgray !important',
                                                              },
                                                              '& .MuiInput-underline:before': {
                                                                borderColor: 'darkgray !important',
                                                                color: 'darkgray !important',
                                                              },
                                                              '& .MuiInput-underline:after': {
                                                                borderColor: 'white !important',
                                                                color: 'darkgray !important',
                                                              },
                                                              '& .Mui-focused:after': {
                                                                color: 'darkgray !important',
                                                              },
                                                              '& .MuiInputAdornment-root': {
                                                                color: 'darkgray !important',
                                                              },
                                                            },
                                                            id: 'input-with-icon-textfield',
                                                            label: 'Name',
                                                            variant: 'standard',
                                                            value: ''.concat(hu.first_name, ' ').concat(hu.last_name),
                                                            InputProps: {
                                                              readOnly: true,
                                                              startAdornment: Object(PZ.jsx)(KE.a, {
                                                                position: 'start',
                                                                children: Object(PZ.jsx)('i', {
                                                                  className: 'fas fa-user fa-w-16 fa-fw',
                                                                }),
                                                              }),
                                                            },
                                                          }),
                                                        }),
                                                      }),
                                                      Object(PZ.jsx)('div', {
                                                        children: Object(PZ.jsx)(Kx.a, {
                                                          onClick: function () {
                                                            return (function (hG, hy, hp) {
                                                              var hc = {
                                                                  cid: hG,
                                                                  name: hy + ' ' + hp,
                                                                  charges: [],
                                                                  months: 0,
                                                                  fine: 0,
                                                                  points: 0,
                                                                  guilty: false,
                                                                  processed: false,
                                                                  warrant: false,
                                                                  warrantdate: 0,
                                                                },
                                                                hJ = [].concat(Object(K9.a)(UZ || []), [hc]);
                                                              KS('ev-mdw:updateIncident', {
                                                                id: U7,
                                                                value: hJ,
                                                                type: 'criminals',
                                                              }).then(function (hD) {
                                                                Ux(hJ);
                                                              });
                                                              var hY = q6.filter(function (hD) {
                                                                return hD.id.toString() !== hG.toString();
                                                              });
                                                              q7(hY);
                                                            })(hu.id, hu.first_name, hu.last_name);
                                                          },
                                                          size: 'small',
                                                          color: 'success',
                                                          variant: 'contained',
                                                          children: 'Add',
                                                        }),
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              });
                                            })
                                          : Object(PZ.jsx)(PZ.Fragment, {}),
                                    }),
                                    Object(PZ.jsx)('div', {
                                      className: dq.mdwIncidentsInnerContentLeftHeader,
                                      style: {
                                        padding: '13px',
                                        marginTop: '17.1%',
                                        justifyContent: 'center',
                                        display: Uo ? 'none' : '',
                                      },
                                      children: Object(PZ.jsx)('div', {
                                        children: Object(PZ.jsx)(Kx.a, {
                                          onClick: function () {
                                            q7([]);
                                            Q1(false);
                                          },
                                          size: 'small',
                                          color: 'warning',
                                          variant: 'contained',
                                          children: 'Close',
                                        }),
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwAddChargeModalContainer,
                            style: { display: Q4 ? '' : 'none' },
                            children: Object(PZ.jsxs)('div', {
                              className: dq.mdwAddChargeModalInnerContainer,
                              children: [
                                Object(PZ.jsx)('div', {
                                  className: 'spinnerwrapper',
                                  style: {
                                    display: Uo ? '' : 'none',
                                    marginLeft: '44%',
                                    marginTop: '14%',
                                  },
                                  children: Object(PZ.jsxs)('div', {
                                    className: 'lds-spinner',
                                    children: [
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                      Object(PZ.jsx)('div', {}),
                                    ],
                                  }),
                                }),
                                Object(PZ.jsxs)('div', {
                                  className: dq.mdwIncidentsInnerContentLeft,
                                  style: {
                                    backgroundColor: 'transparent',
                                    display: Uo ? 'none' : '',
                                  },
                                  children: [
                                    Object(PZ.jsxs)('div', {
                                      className: dq.mdwIncidentsInnerContentLeftHeader,
                                      children: [
                                        Object(PZ.jsx)('div', {
                                          className: 'mdw-incidents-inner-content-left-header-text-left',
                                          children: Object(PZ.jsx)(Pk.a, {
                                            style: {
                                              color: '#fff',
                                              wordBreak: 'break-word',
                                            },
                                            variant: 'body1',
                                            gutterBottom: true,
                                            children: 'Current Charges',
                                          }),
                                        }),
                                        Object(PZ.jsx)('div', {
                                          className: dq.mdwInnerContentLeftHeaderTextRight,
                                          children: Object(PZ.jsxs)(KZ.a, {
                                            direction: 'row',
                                            spacing: 2,
                                            children: [
                                              Object(PZ.jsx)(Kx.a, {
                                                onClick: hf,
                                                size: 'small',
                                                color: 'warning',
                                                variant: 'contained',
                                                children: 'Close',
                                              }),
                                              Object(PZ.jsx)(Kx.a, {
                                                onClick: hf,
                                                size: 'small',
                                                color: 'success',
                                                variant: 'contained',
                                                children: 'Done',
                                              }),
                                            ],
                                          }),
                                        }),
                                      ],
                                    }),
                                    Object(PZ.jsxs)('div', {
                                      className: dq.mdwInnerContentLeftBody,
                                      children: [
                                        Object(PZ.jsx)('div', {
                                          className: dq.mdwInnerContentMiddleBody,
                                          style: {
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            flex: '0 1 0%',
                                            overflowY: 'unset',
                                            paddingLeft: '0px',
                                          },
                                          children:
                                            qY && qY.length > 0
                                              ? qY.map(function (hu) {
                                                  return Object(PZ.jsx)('div', {
                                                    style: {
                                                      paddingRight: '0.5%',
                                                      paddingBottom: '1.5%',
                                                    },
                                                    children: Object(PZ.jsx)(KA.a, {
                                                      label: hu.title,
                                                      onDelete: function () {
                                                        return (function (ho, hH, hG, hy) {
                                                          var hV = Object(K9.a)(UZ),
                                                            hF = U4,
                                                            hc = hV.findIndex(function (hL) {
                                                              return hL.cid.toString() === hF.toString();
                                                            }),
                                                            hJ = hV[hc].charges.filter(function (hL) {
                                                              return hL.id.toString() !== ho.toString();
                                                            }),
                                                            hl = Number(hV[hc].months) || 0,
                                                            hY = Number(hV[hc].fine) || 0,
                                                            hD = Number(hV[hc].points) || 0;
                                                          hV[hc].charges = hJ;
                                                          hV[hc].months = hl - Number(hH);
                                                          hV[hc].fine = hY - Number(hG);
                                                          hV[hc].points = hD - Number(hy);
                                                          Ux(hV);
                                                          qD(hJ);
                                                        })(hu.id, hu.months, hu.fine, hu.points);
                                                      },
                                                      sx: {
                                                        backgroundColor: '#000',
                                                        color: '#fff',
                                                        '& .MuiChip-deleteIcon': { color: '#fff' },
                                                        '& .MuiChip-deleteIcon:hover': {
                                                          color: 'rgba(255, 255, 255, 0.5)',
                                                        },
                                                      },
                                                    }),
                                                  });
                                                })
                                              : Object(PZ.jsx)(PZ.Fragment, {}),
                                        }),
                                        Object(PZ.jsx)(Km.a, {
                                          style: {
                                            borderColor: 'rgb(255, 255, 255)',
                                          },
                                          variant: 'fullWidth',
                                        }),
                                      ],
                                    }),
                                    Object(PZ.jsx)('div', {
                                      className: dq.mdwChargesInnerContent,
                                      style: {
                                        height: '17%',
                                        flexDirection: 'column',
                                        marginBottom: '0.2%',
                                        padding: '8px',
                                      },
                                      children: Object(PZ.jsxs)('div', {
                                        className: dq.mdwChargesInnerContentLeft,
                                        children: [
                                          Object(PZ.jsxs)('div', {
                                            className: dq.mdwChargesInnerContentLeftHeader,
                                            children: [
                                              Object(PZ.jsx)('div', {
                                                className: 'mdw-charges-inner-content-left-header-text-left',
                                                children: Object(PZ.jsx)(Pk.a, {
                                                  style: {
                                                    color: '#fff',
                                                    wordBreak: 'break-word',
                                                  },
                                                  variant: 'h6',
                                                  gutterBottom: true,
                                                  children: 'Charges',
                                                }),
                                              }),
                                              Object(PZ.jsx)('div', {
                                                className: dq.mdwInnerContentLeftHeaderTextRight,
                                                children: Object(PZ.jsx)('div', {
                                                  className: 'input-wrapper',
                                                  children: Object(PZ.jsx)(Kk.a, {
                                                    fullWidth: true,
                                                    sx: { width: '100%' },
                                                    children: Object(PZ.jsx)(KB.a, {
                                                      sx: {
                                                        '& .MuiInput-root': {
                                                          color: 'white !important',
                                                        },
                                                        '& label.Mui-focused': {
                                                          color: 'darkgray !important',
                                                        },
                                                        '& Mui-focused': {
                                                          color: 'darkgray !important',
                                                        },
                                                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                          borderColor: 'darkgray !important',
                                                        },
                                                        '& .MuiInput-underline:before': {
                                                          borderColor: 'darkgray !important',
                                                          color: 'darkgray !important',
                                                        },
                                                        '& .MuiInput-underline:after': {
                                                          borderColor: 'white !important',
                                                          color: 'darkgray !important',
                                                        },
                                                        '& .Mui-focused:after': {
                                                          color: 'darkgray !important',
                                                        },
                                                        '& .MuiInputAdornment-root': {
                                                          color: 'darkgray !important',
                                                        },
                                                      },
                                                      id: 'input-with-icon-textfield',
                                                      label: 'Search',
                                                      variant: 'standard',
                                                      onChange: function (hu) {
                                                        return hB(hu.target.value);
                                                      },
                                                      InputProps: {
                                                        startAdornment: Object(PZ.jsx)(KE.a, {
                                                          position: 'start',
                                                          children: Object(PZ.jsx)('i', {
                                                            className: 'fas fa-search fa-w-16 fa-fw',
                                                          }),
                                                        }),
                                                      },
                                                    }),
                                                  }),
                                                }),
                                              }),
                                            ],
                                          }),
                                          Object(PZ.jsx)('div', {
                                            className: dq.mdwInnerContentLeftBody,
                                            children: Object(PZ.jsx)('div', {
                                              className: 'component-paper cursor-pointer',
                                              style: {
                                                width: '100%',
                                                borderBottom: '0px solid #fff',
                                                borderRadius: '0px',
                                                backgroundColor: '#222831',
                                                border: '1px solid #000',
                                              },
                                              children: Object(PZ.jsx)('div', {
                                                className: 'main-container',
                                                children: Object(PZ.jsx)('div', {
                                                  className: 'details',
                                                  children: Object(PZ.jsx)('div', {
                                                    className: 'description',
                                                    children: Object(PZ.jsx)('div', {
                                                      className: 'flex-row',
                                                      children: Object(PZ.jsx)(Pk.a, {
                                                        style: {
                                                          color: '#fff',
                                                          wordBreak: 'break-word',
                                                        },
                                                        variant: 'body2',
                                                        gutterBottom: true,
                                                        children:
                                                          'An accomplice differs from an accessory in that an accomplice is present at the actual crime, and could be prosecuted even if the main criminal (the principal) is not charged or convicted. An accessory is generally not present at the actual crime, and may be subject to lesser penalties than an accomplice or principal.',
                                                      }),
                                                    }),
                                                  }),
                                                }),
                                              }),
                                            }),
                                          }),
                                        ],
                                      }),
                                    }),
                                    hv && hv.length > 0
                                      ? hv.map(function (hu) {
                                          return Object(PZ.jsx)('div', {
                                            className: dq.mdwChargesInnerContent,
                                            style: {
                                              height: 'fit-content',
                                              flexDirection: 'column',
                                              marginBottom: '0.2%',
                                              padding: '8px',
                                            },
                                            children: Object(PZ.jsxs)('div', {
                                              className: dq.mdwChargesInnerContentLeft,
                                              children: [
                                                Object(PZ.jsxs)('div', {
                                                  className: dq.mdwChargesInnerContentLeftHeader,
                                                  children: [
                                                    Object(PZ.jsx)('div', {
                                                      className: 'mdw-charges-inner-content-left-header-text-left',
                                                      children: Object(PZ.jsx)(Pk.a, {
                                                        style: {
                                                          color: '#fff',
                                                          wordBreak: 'break-word',
                                                        },
                                                        variant: 'h6',
                                                        gutterBottom: true,
                                                        children: hu.category,
                                                      }),
                                                    }),
                                                    Object(PZ.jsx)('div', {
                                                      className: dq.mdwInnerContentLeftHeaderTextRight,
                                                    }),
                                                  ],
                                                }),
                                                Object(PZ.jsx)('div', {
                                                  className: dq.mdwInnerContentLeftBody,
                                                  style: {
                                                    flexDirection: 'row',
                                                    flexWrap: 'wrap',
                                                    flex: '0',
                                                    overflowY: 'unset',
                                                    paddingLeft: '5.5%',
                                                  },
                                                  children:
                                                    hu.charges && hu.charges.length > 0
                                                      ? hu.charges
                                                          .filter(function (hH) {
                                                            return hM(hH.title);
                                                          })
                                                          .map(function (hH) {
                                                            return Object(PZ.jsx)('div', {
                                                              onClick: function () {
                                                                return (function (hp, hV, hF, hc) {
                                                                  var hl = U4,
                                                                    hY = Object(K9.a)(UZ),
                                                                    hD = hY.findIndex(function (hN) {
                                                                      return hN.cid.toString() === hl.toString();
                                                                    }),
                                                                    hL = hY[hD].charges,
                                                                    hR = Number(hY[hD].months),
                                                                    hs = Number(hY[hD].fine),
                                                                    hO = Number(hY[hD].points),
                                                                    hC = {
                                                                      id: hA(4),
                                                                      title: hp,
                                                                      months: Number(hV),
                                                                      fine: Number(hF),
                                                                      points: Number(hc),
                                                                    },
                                                                    hz = [].concat(Object(K9.a)(hL || []), [hC]);
                                                                  hY[hD].charges = hz;
                                                                  hY[hD].months = hR + Number(hV);
                                                                  hY[hD].fine = hs + Number(hF);
                                                                  hY[hD].points = hO + Number(hc);
                                                                  Ux(hY);
                                                                  qD(hz);
                                                                })(hH.title, hH.months, hH.fine, hH.points);
                                                              },
                                                              className: 'component-paper cursor-pointer',
                                                              style: {
                                                                width: '30%',
                                                                borderBottom: '0px solid #fff',
                                                                borderRadius: '0px',
                                                                backgroundColor: ''.concat(hu.color),
                                                                border: '1px solid #000',
                                                                marginRight: '2%',
                                                                height: 'fit-content',
                                                              },
                                                              children: Object(PZ.jsx)('div', {
                                                                className: 'main-container',
                                                                children: Object(PZ.jsx)('div', {
                                                                  className: 'details',
                                                                  children: Object(PZ.jsxs)('div', {
                                                                    className: 'description',
                                                                    children: [
                                                                      Object(PZ.jsx)('div', {
                                                                        className: 'flex-row',
                                                                        style: {
                                                                          flexDirection: 'column',
                                                                        },
                                                                        children: Object(PZ.jsx)(Pk.a, {
                                                                          style: {
                                                                            color: '#fff',
                                                                            wordBreak: 'break-word',
                                                                            textAlign: 'center',
                                                                          },
                                                                          variant: 'body1',
                                                                          gutterBottom: true,
                                                                          children: hH.title,
                                                                        }),
                                                                      }),
                                                                      Object(PZ.jsxs)('div', {
                                                                        className: 'flex-row',
                                                                        style: {
                                                                          flexDirection: 'row',
                                                                          justifyContent: 'space-evenly',
                                                                        },
                                                                        children: [
                                                                          Object(PZ.jsxs)(Pk.a, {
                                                                            style: {
                                                                              color: '#fff',
                                                                              wordBreak: 'break-word',
                                                                              textAlign: 'center',
                                                                            },
                                                                            variant: 'body2',
                                                                            gutterBottom: true,
                                                                            children: [void 0 !== hH.months ? hH.months : '0', ' months'],
                                                                          }),
                                                                          Object(PZ.jsx)(Pk.a, {
                                                                            style: {
                                                                              color: '#fff',
                                                                              wordBreak: 'break-word',
                                                                              textAlign: 'center',
                                                                            },
                                                                            variant: 'body2',
                                                                            gutterBottom: true,
                                                                            children: void 0 !== hH.fine ? hb(hH.fine) : '$0.0',
                                                                          }),
                                                                          Object(PZ.jsxs)(Pk.a, {
                                                                            style: {
                                                                              color: '#fff',
                                                                              wordBreak: 'break-word',
                                                                              textAlign: 'center',
                                                                            },
                                                                            variant: 'body2',
                                                                            gutterBottom: true,
                                                                            children: [void 0 !== hH.points ? hH.points : '0', ' point(s)'],
                                                                          }),
                                                                        ],
                                                                      }),
                                                                      Object(PZ.jsx)('div', {
                                                                        style: {
                                                                          marginTop: '1%',
                                                                          marginBottom: '0.3%',
                                                                        },
                                                                        children: Object(PZ.jsx)(Km.a, {
                                                                          style: {
                                                                            borderColor: '#30475e',
                                                                          },
                                                                          variant: 'fullWidth',
                                                                        }),
                                                                      }),
                                                                      Object(PZ.jsx)('div', {
                                                                        className: 'flex-row',
                                                                        style: {
                                                                          flexDirection: 'column',
                                                                        },
                                                                        children: Object(PZ.jsx)(Pk.a, {
                                                                          style: {
                                                                            color: '#fff',
                                                                            wordBreak: 'break-word',
                                                                            textAlign: 'center',
                                                                          },
                                                                          variant: 'body2',
                                                                          gutterBottom: true,
                                                                          children: 'as Accomplice',
                                                                        }),
                                                                      }),
                                                                      Object(PZ.jsxs)('div', {
                                                                        className: 'flex-row',
                                                                        style: {
                                                                          flexDirection: 'row',
                                                                          justifyContent: 'space-evenly',
                                                                        },
                                                                        children: [
                                                                          Object(PZ.jsxs)(Pk.a, {
                                                                            style: {
                                                                              color: '#fff',
                                                                              wordBreak: 'break-word',
                                                                              textAlign: 'center',
                                                                            },
                                                                            variant: 'body2',
                                                                            gutterBottom: true,
                                                                            children: [void 0 !== hH.months ? hH.months : '0', ' months'],
                                                                          }),
                                                                          Object(PZ.jsx)(Pk.a, {
                                                                            style: {
                                                                              color: '#fff',
                                                                              wordBreak: 'break-word',
                                                                              textAlign: 'center',
                                                                            },
                                                                            variant: 'body2',
                                                                            gutterBottom: true,
                                                                            children: void 0 !== hH.fine ? hb(hH.fine) : '$0.0',
                                                                          }),
                                                                          Object(PZ.jsxs)(Pk.a, {
                                                                            style: {
                                                                              color: '#fff',
                                                                              wordBreak: 'break-word',
                                                                              textAlign: 'center',
                                                                            },
                                                                            variant: 'body2',
                                                                            gutterBottom: true,
                                                                            children: [void 0 !== hH.points ? hH.points : '0', ' point(s)'],
                                                                          }),
                                                                        ],
                                                                      }),
                                                                      Object(PZ.jsx)('div', {
                                                                        style: {
                                                                          marginTop: '1%',
                                                                          marginBottom: '0.3%',
                                                                        },
                                                                        children: Object(PZ.jsx)(Km.a, {
                                                                          style: {
                                                                            borderColor: '#30475e',
                                                                          },
                                                                          variant: 'fullWidth',
                                                                        }),
                                                                      }),
                                                                      Object(PZ.jsx)('div', {
                                                                        className: 'flex-row',
                                                                        style: {
                                                                          flexDirection: 'column',
                                                                        },
                                                                        children: Object(PZ.jsx)(Pk.a, {
                                                                          style: {
                                                                            color: '#fff',
                                                                            wordBreak: 'break-word',
                                                                            textAlign: 'center',
                                                                          },
                                                                          variant: 'body2',
                                                                          gutterBottom: true,
                                                                          children: 'as Accessory',
                                                                        }),
                                                                      }),
                                                                      Object(PZ.jsxs)('div', {
                                                                        className: 'flex-row',
                                                                        style: {
                                                                          flexDirection: 'row',
                                                                          justifyContent: 'space-evenly',
                                                                          marginBottom: '0.3%',
                                                                        },
                                                                        children: [
                                                                          Object(PZ.jsx)(Pk.a, {
                                                                            style: {
                                                                              color: '#fff',
                                                                              wordBreak: 'break-word',
                                                                              textAlign: 'center',
                                                                            },
                                                                            variant: 'body2',
                                                                            gutterBottom: true,
                                                                            children: '0 months',
                                                                          }),
                                                                          Object(PZ.jsx)(Pk.a, {
                                                                            style: {
                                                                              color: '#fff',
                                                                              wordBreak: 'break-word',
                                                                              textAlign: 'center',
                                                                            },
                                                                            variant: 'body2',
                                                                            gutterBottom: true,
                                                                            children: '$0.00',
                                                                          }),
                                                                          Object(PZ.jsx)(Pk.a, {
                                                                            style: {
                                                                              color: '#fff',
                                                                              wordBreak: 'break-word',
                                                                              textAlign: 'center',
                                                                            },
                                                                            variant: 'body2',
                                                                            gutterBottom: true,
                                                                            children: '0 point(s)',
                                                                          }),
                                                                        ],
                                                                      }),
                                                                    ],
                                                                  }),
                                                                }),
                                                              }),
                                                            });
                                                          })
                                                      : Object(PZ.jsx)(PZ.Fragment, {}),
                                                }),
                                              ],
                                            }),
                                          });
                                        })
                                      : Object(PZ.jsx)(PZ.Fragment, {}),
                                  ],
                                }),
                              ],
                            }),
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwAssignEvidenceModalContainer,
                            style: { display: Up ? '' : 'none' },
                            children: Object(PZ.jsx)('div', {
                              className: dq.mdwAssignEvidenceModalInnerContainer,
                              children: Object(PZ.jsxs)('div', {
                                className: 'mdw-details',
                                style: {
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignContent: 'space-between',
                                  position: 'relative',
                                  justifyContent: 'space-between',
                                  flex: '1 1',
                                  overflow: 'hidden',
                                },
                                children: [
                                  Object(PZ.jsx)('div', {
                                    className: 'spinnerwrapper',
                                    style: {
                                      display: Uo ? 'flex' : 'none',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      marginTop: '55%',
                                    },
                                    children: Object(PZ.jsxs)('div', {
                                      className: 'lds-spinner',
                                      children: [
                                        Object(PZ.jsx)('div', {}),
                                        Object(PZ.jsx)('div', {}),
                                        Object(PZ.jsx)('div', {}),
                                        Object(PZ.jsx)('div', {}),
                                        Object(PZ.jsx)('div', {}),
                                        Object(PZ.jsx)('div', {}),
                                        Object(PZ.jsx)('div', {}),
                                        Object(PZ.jsx)('div', {}),
                                        Object(PZ.jsx)('div', {}),
                                        Object(PZ.jsx)('div', {}),
                                        Object(PZ.jsx)('div', {}),
                                        Object(PZ.jsx)('div', {}),
                                      ],
                                    }),
                                  }),
                                  Object(PZ.jsxs)('div', {
                                    className: 'mdw-desc',
                                    style: { display: Uo ? 'none' : '' },
                                    children: [
                                      Object(PZ.jsx)('div', {
                                        className: 'flex-row',
                                        style: {
                                          display: 'flex',
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                          justifyContent: 'flex-start',
                                          padding: '15px',
                                        },
                                        children: Object(PZ.jsx)(Pk.a, {
                                          style: {
                                            color: '#fff',
                                            wordBreak: 'break-word',
                                          },
                                          variant: 'body1',
                                          gutterBottom: true,
                                          children: 'Assign Evidence',
                                        }),
                                      }),
                                      Object(PZ.jsx)('div', {
                                        className: 'flex-row',
                                        style: {
                                          display: 'flex',
                                          alignItems: 'center',
                                          flexDirection: 'column',
                                          justifyContent: 'center',
                                          padding: '8px',
                                          paddingBottom: '0px',
                                          paddingTop: '0px',
                                        },
                                        children: Object(PZ.jsx)('div', {
                                          className: 'input-wrapper',
                                          style: {
                                            width: '96%',
                                            marginBottom: '5%',
                                          },
                                          children: Object(PZ.jsx)(Kk.a, {
                                            fullWidth: true,
                                            sx: { width: '100%' },
                                            children: Object(PZ.jsx)(KB.a, {
                                              sx: {
                                                '& .MuiInput-root': {
                                                  color: 'white !important',
                                                },
                                                '& label.Mui-focused': {
                                                  color: 'darkgray !important',
                                                },
                                                '& Mui-focused': {
                                                  color: 'darkgray !important',
                                                },
                                                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                  borderColor: 'darkgray !important',
                                                },
                                                '& .MuiInput-underline:before': {
                                                  borderColor: 'darkgray !important',
                                                  color: 'darkgray !important',
                                                },
                                                '& .MuiInput-underline:after': {
                                                  borderColor: 'white !important',
                                                  color: 'darkgray !important',
                                                },
                                                '& .Mui-focused:after': {
                                                  color: 'darkgray !important',
                                                },
                                                '& .MuiInputAdornment-root': {
                                                  color: 'darkgray !important',
                                                },
                                              },
                                              id: 'input-with-icon-textfield',
                                              label: 'Identifier',
                                              variant: 'standard',
                                              InputProps: {
                                                startAdornment: Object(PZ.jsx)(KE.a, {
                                                  position: 'start',
                                                  children: Object(PZ.jsx)('i', {
                                                    className: 'fas fa-fingerprint fa-w-16 fa-fw',
                                                  }),
                                                }),
                                              },
                                            }),
                                          }),
                                        }),
                                      }),
                                      Object(PZ.jsx)('div', {
                                        className: 'flex-row',
                                        style: {
                                          display: 'flex',
                                          flexDirection: 'column',
                                          justifyContent: 'flex-end',
                                          alignItems: 'flex-end',
                                          paddingRight: '15px',
                                        },
                                        children: Object(PZ.jsx)('div', {
                                          children: Object(PZ.jsx)(Kx.a, {
                                            size: 'small',
                                            color: 'success',
                                            variant: 'contained',
                                            children: 'Assign',
                                          }),
                                        }),
                                      }),
                                    ],
                                  }),
                                  Object(PZ.jsxs)('div', {
                                    className: 'mdw-desc',
                                    style: { display: Uo ? 'none' : '' },
                                    children: [
                                      Object(PZ.jsx)('div', {
                                        className: 'flex-row',
                                        style: {
                                          display: 'flex',
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                          justifyContent: 'flex-start',
                                          padding: '15px',
                                        },
                                        children: Object(PZ.jsx)(Pk.a, {
                                          style: {
                                            color: '#fff',
                                            wordBreak: 'break-word',
                                          },
                                          variant: 'body1',
                                          gutterBottom: true,
                                          children: 'Add New Evidence',
                                        }),
                                      }),
                                      Object(PZ.jsxs)('div', {
                                        className: 'flex-row',
                                        style: {
                                          display: 'flex',
                                          alignItems: 'center',
                                          flexDirection: 'column',
                                          justifyContent: 'center',
                                          padding: '8px',
                                          paddingBottom: '0px',
                                        },
                                        children: [
                                          Object(PZ.jsx)('div', {
                                            className: 'input-wrapper',
                                            style: {
                                              width: '96%',
                                              marginBottom: '5%',
                                            },
                                            children: Object(PZ.jsx)(Kk.a, {
                                              fullWidth: true,
                                              sx: { width: '100%' },
                                              children: Object(PZ.jsxs)(KB.a, {
                                                id: 'outlined-select-currency',
                                                variant: 'standard',
                                                select: true,
                                                label: 'Type',
                                                defaultValue: 'other',
                                                onChange: function (hu) {
                                                  return QT(hu.target.value);
                                                },
                                                sx: {
                                                  '& .MuiInput-root': {
                                                    color: 'white !important',
                                                  },
                                                  '& label.Mui-focused': {
                                                    color: 'darkgray !important',
                                                  },
                                                  '& Mui-focused': {
                                                    color: 'darkgray !important',
                                                  },
                                                  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                    borderColor: 'darkgray !important',
                                                  },
                                                  '& .MuiInput-underline:before': {
                                                    borderColor: 'darkgray !important',
                                                    color: 'darkgray !important',
                                                  },
                                                  '& .MuiInput-underline:after': {
                                                    borderColor: 'white !important',
                                                    color: 'darkgray !important',
                                                  },
                                                  '& .Mui-focused:after': {
                                                    color: 'darkgray !important',
                                                  },
                                                  '& .MuiInputAdornment-root': {
                                                    color: 'darkgray !important',
                                                  },
                                                },
                                                children: [
                                                  Object(PZ.jsx)(
                                                    KT.a,
                                                    {
                                                      value: 'other',
                                                      children: 'Other',
                                                    },
                                                    'other',
                                                  ),
                                                  Object(PZ.jsx)(
                                                    KT.a,
                                                    {
                                                      value: 'blood',
                                                      children: 'Blood',
                                                    },
                                                    'blood',
                                                  ),
                                                  Object(PZ.jsx)(
                                                    KT.a,
                                                    {
                                                      value: 'casing',
                                                      children: 'Casing',
                                                    },
                                                    'casing',
                                                  ),
                                                  Object(PZ.jsx)(
                                                    KT.a,
                                                    {
                                                      value: 'weapon',
                                                      children: 'Weapon',
                                                    },
                                                    'weapon',
                                                  ),
                                                  Object(PZ.jsx)(
                                                    KT.a,
                                                    {
                                                      value: 'photo',
                                                      children: 'Photo',
                                                    },
                                                    'photo',
                                                  ),
                                                ],
                                              }),
                                            }),
                                          }),
                                          Object(PZ.jsx)('div', {
                                            className: 'input-wrapper',
                                            style: {
                                              width: '96%',
                                              marginBottom: '5%',
                                            },
                                            children: Object(PZ.jsx)(Kk.a, {
                                              fullWidth: true,
                                              sx: { width: '100%' },
                                              children: Object(PZ.jsx)(KB.a, {
                                                sx: {
                                                  '& .MuiInput-root': {
                                                    color: 'white !important',
                                                  },
                                                  '& label.Mui-focused': {
                                                    color: 'darkgray !important',
                                                  },
                                                  '& Mui-focused': {
                                                    color: 'darkgray !important',
                                                  },
                                                  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                    borderColor: 'darkgray !important',
                                                  },
                                                  '& .MuiInput-underline:before': {
                                                    borderColor: 'darkgray !important',
                                                    color: 'darkgray !important',
                                                  },
                                                  '& .MuiInput-underline:after': {
                                                    borderColor: 'white !important',
                                                    color: 'darkgray !important',
                                                  },
                                                  '& .Mui-focused:after': {
                                                    color: 'darkgray !important',
                                                  },
                                                  '& .MuiInputAdornment-root': {
                                                    color: 'darkgray !important',
                                                  },
                                                },
                                                id: 'input-with-icon-textfield',
                                                label: 'Identifier',
                                                variant: 'standard',
                                                onChange: function (hu) {
                                                  return Qm(hu.target.value);
                                                },
                                                value: QA,
                                                InputProps: {
                                                  startAdornment: Object(PZ.jsx)(KE.a, {
                                                    position: 'start',
                                                    children: Object(PZ.jsx)('i', {
                                                      className: 'fas fa-pen fa-w-16 fa-fw',
                                                    }),
                                                  }),
                                                },
                                              }),
                                            }),
                                          }),
                                          Object(PZ.jsx)('div', {
                                            className: 'input-wrapper',
                                            style: {
                                              width: '96%',
                                              marginBottom: '5%',
                                            },
                                            children: Object(PZ.jsx)(Kk.a, {
                                              fullWidth: true,
                                              sx: { width: '100%' },
                                              children: Object(PZ.jsx)(KB.a, {
                                                sx: {
                                                  '& .MuiInput-root': {
                                                    color: 'white !important',
                                                  },
                                                  '& label.Mui-focused': {
                                                    color: 'darkgray !important',
                                                  },
                                                  '& Mui-focused': {
                                                    color: 'darkgray !important',
                                                  },
                                                  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                    borderColor: 'darkgray !important',
                                                  },
                                                  '& .MuiInput-underline:before': {
                                                    borderColor: 'darkgray !important',
                                                    color: 'darkgray !important',
                                                  },
                                                  '& .MuiInput-underline:after': {
                                                    borderColor: 'white !important',
                                                    color: 'darkgray !important',
                                                  },
                                                  '& .Mui-focused:after': {
                                                    color: 'darkgray !important',
                                                  },
                                                  '& .MuiInputAdornment-root': {
                                                    color: 'darkgray !important',
                                                  },
                                                },
                                                id: 'input-with-icon-textfield',
                                                label: 'Description',
                                                variant: 'standard',
                                                onChange: function (hu) {
                                                  return Qv(hu.target.value);
                                                },
                                                value: QM,
                                                InputProps: {
                                                  startAdornment: Object(PZ.jsx)(KE.a, {
                                                    position: 'start',
                                                    children: Object(PZ.jsx)('i', {
                                                      className: 'fas fa-clipboard fa-w-16 fa-fw',
                                                    }),
                                                  }),
                                                },
                                              }),
                                            }),
                                          }),
                                          Object(PZ.jsx)('div', {
                                            className: 'input-wrapper',
                                            style: {
                                              width: '96%',
                                              marginBottom: '5%',
                                            },
                                            children: Object(PZ.jsx)(Kk.a, {
                                              fullWidth: true,
                                              sx: { width: '100%' },
                                              children: Object(PZ.jsx)(KB.a, {
                                                sx: {
                                                  '& .MuiInput-root': {
                                                    color: 'white !important',
                                                  },
                                                  '& label.Mui-focused': {
                                                    color: 'darkgray !important',
                                                  },
                                                  '& Mui-focused': {
                                                    color: 'darkgray !important',
                                                  },
                                                  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                    borderColor: 'darkgray !important',
                                                  },
                                                  '& .MuiInput-underline:before': {
                                                    borderColor: 'darkgray !important',
                                                    color: 'darkgray !important',
                                                  },
                                                  '& .MuiInput-underline:after': {
                                                    borderColor: 'white !important',
                                                    color: 'darkgray !important',
                                                  },
                                                  '& .Mui-focused:after': {
                                                    color: 'darkgray !important',
                                                  },
                                                  '& .MuiInputAdornment-root': {
                                                    color: 'darkgray !important',
                                                  },
                                                },
                                                id: 'input-with-icon-textfield',
                                                label: 'CID',
                                                variant: 'standard',
                                                onChange: function (hu) {
                                                  return Qo(hu.target.value);
                                                },
                                                value: Qa,
                                                InputProps: {
                                                  startAdornment: Object(PZ.jsx)(KE.a, {
                                                    position: 'start',
                                                    children: Object(PZ.jsx)('i', {
                                                      className: 'fas fa-user fa-w-16 fa-fw',
                                                    }),
                                                  }),
                                                },
                                              }),
                                            }),
                                          }),
                                        ],
                                      }),
                                      Object(PZ.jsx)('div', {
                                        className: 'flex-row',
                                        style: {
                                          display: 'flex',
                                          flexDirection: 'column',
                                          justifyContent: 'flex-end',
                                          alignItems: 'flex-end',
                                          paddingRight: '15px',
                                        },
                                        children: Object(PZ.jsx)('div', {
                                          children: Object(PZ.jsx)(Kx.a, {
                                            onClick: function () {
                                              var hu = {
                                                  id: hA(4),
                                                  type: QE,
                                                  identifier: QA,
                                                  description: QM,
                                                  cid: Qa,
                                                },
                                                ha = [].concat(Object(K9.a)(UK || []), [hu]);
                                              UH(true);
                                              KS('ev-mdw:updateIncident', {
                                                id: U7,
                                                value: ha,
                                                secondValue: hu,
                                                type: 'evidence',
                                                add: true,
                                              }).then(function (ho) {
                                                UH(false);
                                                UP(ha);
                                              });
                                            },
                                            size: 'small',
                                            color: 'success',
                                            variant: 'contained',
                                            children: 'Create',
                                          }),
                                        }),
                                      }),
                                    ],
                                  }),
                                  Object(PZ.jsx)('div', {
                                    className: 'mdw-alignbottom',
                                    style: {
                                      display: Uo ? 'none' : 'flex',
                                      justifyContent: 'flex-end',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      padding: '8px',
                                      marginTop: '1%',
                                    },
                                    children: Object(PZ.jsx)('div', {
                                      children: Object(PZ.jsx)(Kx.a, {
                                        onClick: function () {
                                          return UV(false);
                                        },
                                        size: 'small',
                                        color: 'warning',
                                        variant: 'contained',
                                        children: 'Close',
                                      }),
                                    }),
                                  }),
                                ],
                              }),
                            }),
                          }),
                          Object(PZ.jsxs)('div', {
                            className: dq.mdwHeader,
                            onMouseEnter: function () {
                              return Qj(true);
                            },
                            onMouseLeave: function () {
                              return Qj(false);
                            },
                            children: [
                              Object(PZ.jsx)('div', {
                                className: 'mdw-header-logo',
                                children: Object(PZ.jsx)('img', {
                                  alt: '',
                                  src:
                                    'police' === hZ
                                      ? 'https://gta-assets.nopixel.net/images/mdw-lspd.png'
                                      : 'sheriff' === hZ
                                      ? 'https://gta-assets.nopixel.net/images/mdw-bcso.png'
                                      : 'state' === hZ
                                      ? 'https://gta-assets.nopixel.net/images/mdw-troopers.png'
                                      : 'ranger' === hZ
                                      ? 'https://gta-assets.nopixel.net/images/mdw-ranger.png'
                                      : 'judge' === hZ
                                      ? 'https://i.imgur.com/LnMPAZH.png'
                                      : 'https://gta-assets.nopixel.net/images/mdw-generic.png',
                                }),
                              }),
                              Object(PZ.jsxs)('div', {
                                className: dq.mdwHeaderText,
                                children: [
                                  Object(PZ.jsxs)('div', {
                                    children: [
                                      Object(PZ.jsx)(Pk.a, {
                                        style: {
                                          color: '#fff',
                                          wordBreak: 'break-word',
                                        },
                                        variant: 'h6',
                                        gutterBottom: true,
                                        children: 'Quote of the Day',
                                      }),
                                      Object(PZ.jsx)(Pk.a, {
                                        style: {
                                          color: '#fff',
                                          wordBreak: 'break-word',
                                          textAlign: 'right',
                                        },
                                        variant: 'body1',
                                        gutterBottom: true,
                                        children: "- I don't actually change on a daily basis.",
                                      }),
                                    ],
                                  }),
                                  Object(PZ.jsx)('div', {
                                    className: dq.mdwHeaderFlex,
                                  }),
                                  Object(PZ.jsx)('div', {
                                    children: Object(PZ.jsx)(Pk.a, {
                                      style: {
                                        color: '#fff',
                                        wordBreak: 'break-word',
                                      },
                                      variant: 'body1',
                                      gutterBottom: true,
                                      children: dV ? 'Profile Not Found' : ''.concat(dv, ' "').concat(dT, '" ').concat(dj, ' ').concat(dT),
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          Object(PZ.jsx)('div', {
                            className: dq.mdwOuterBody,
                            children: Object(PZ.jsxs)('div', {
                              className: dq.mdwInnerBody,
                              style: { zIndex: '100' },
                              children: [
                                Object(PZ.jsx)('div', {
                                  className: dq.mdwTabsOuterContainer,
                                  children: Object(PZ.jsx)('div', {
                                    className: dq.mdwTabsInnerContainer,
                                    children: Object(PZ.jsxs)('div', {
                                      className: dq.mdwTabsFlexContainer,
                                      children: [
                                        Object(PZ.jsx)(Kf.b, {
                                          to: '/dashboard',
                                          onClick: function () {
                                            return hm(1);
                                          },
                                          style: {
                                            color: '#fff',
                                            textDecoration: 'none',
                                          },
                                          children: Object(PZ.jsx)('div', {
                                            className: 1 === dl ? 'mdw-tab active-tab' : 'mdw-tab',
                                            style: {
                                              display: dV ? 'none' : '',
                                            },
                                            children: Object(PZ.jsx)(Pk.a, {
                                              style: {
                                                color: '#fff',
                                                wordBreak: 'break-word',
                                              },
                                              variant: 'h6',
                                              gutterBottom: true,
                                              children: 'Dashboard',
                                            }),
                                          }),
                                        }),
                                        Object(PZ.jsx)(Kf.b, {
                                          to: '/incidents',
                                          onClick: function () {
                                            return hm(2);
                                          },
                                          style: {
                                            color: '#fff',
                                            textDecoration: 'none',
                                          },
                                          children: Object(PZ.jsx)('div', {
                                            className: 2 === dl ? 'mdw-tab active-tab' : 'mdw-tab',
                                            style: {
                                              display: dV || 'ems' === hZ ? 'none' : '',
                                            },
                                            children: Object(PZ.jsx)(Pk.a, {
                                              style: {
                                                color: '#fff',
                                                wordBreak: 'break-word',
                                              },
                                              variant: 'h6',
                                              gutterBottom: true,
                                              children: 'Incidents',
                                            }),
                                          }),
                                        }),
                                        Object(PZ.jsx)(Kf.b, {
                                          to: '/incidentsems',
                                          onClick: function () {
                                            return hm(11);
                                          },
                                          style: {
                                            color: '#fff',
                                            textDecoration: 'none',
                                          },
                                          children: Object(PZ.jsx)('div', {
                                            className: 11 === dl ? 'mdw-tab active-tab' : 'mdw-tab',
                                            style: {
                                              display: 'ems' === hZ ? '' : 'none',
                                            },
                                            children: Object(PZ.jsx)(Pk.a, {
                                              style: {
                                                color: '#fff',
                                                wordBreak: 'break-word',
                                              },
                                              variant: 'h6',
                                              gutterBottom: true,
                                              children: 'Incidents',
                                            }),
                                          }),
                                        }),
                                        Object(PZ.jsx)(Kf.b, {
                                          to: '/profiles',
                                          onClick: function () {
                                            return hm(3);
                                          },
                                          style: {
                                            color: '#fff',
                                            textDecoration: 'none',
                                          },
                                          children: Object(PZ.jsx)('div', {
                                            className: 3 === dl ? 'mdw-tab active-tab' : 'mdw-tab',
                                            children: Object(PZ.jsx)(Pk.a, {
                                              style: {
                                                color: '#fff',
                                                wordBreak: 'break-word',
                                              },
                                              variant: 'h6',
                                              gutterBottom: true,
                                              children: 'Profiles',
                                            }),
                                          }),
                                        }),
                                        Object(PZ.jsx)(Kf.b, {
                                          to: '/dmv',
                                          onClick: function () {
                                            return hm(4);
                                          },
                                          style: {
                                            color: '#fff',
                                            textDecoration: 'none',
                                          },
                                          children: Object(PZ.jsx)('div', {
                                            className: 4 === dl ? 'mdw-tab active-tab' : 'mdw-tab',
                                            style: {
                                              display: dV || 'ems' === hZ ? 'none' : '',
                                            },
                                            children: Object(PZ.jsx)(Pk.a, {
                                              style: {
                                                color: '#fff',
                                                wordBreak: 'break-word',
                                              },
                                              variant: 'h6',
                                              gutterBottom: true,
                                              children: 'DMV',
                                            }),
                                          }),
                                        }),
                                        Object(PZ.jsx)(Kf.b, {
                                          to: '/reports',
                                          onClick: function () {
                                            return hm(5);
                                          },
                                          style: {
                                            color: '#fff',
                                            textDecoration: 'none',
                                          },
                                          children: Object(PZ.jsx)('div', {
                                            className: 5 === dl ? 'mdw-tab active-tab' : 'mdw-tab',
                                            style: {
                                              display: dV || 'ems' === hZ ? 'none' : '',
                                            },
                                            children: Object(PZ.jsx)(Pk.a, {
                                              style: {
                                                color: '#fff',
                                                wordBreak: 'break-word',
                                              },
                                              variant: 'h6',
                                              gutterBottom: true,
                                              children: 'Reports',
                                            }),
                                          }),
                                        }),
                                        Object(PZ.jsx)(Kf.b, {
                                          to: '/evidence',
                                          onClick: function () {
                                            return hm(6);
                                          },
                                          style: {
                                            color: '#fff',
                                            textDecoration: 'none',
                                          },
                                          children: Object(PZ.jsx)('div', {
                                            className: 6 === dl ? 'mdw-tab active-tab' : 'mdw-tab',
                                            style: {
                                              display: dV || 'ems' === hZ ? 'none' : '',
                                            },
                                            children: Object(PZ.jsx)(Pk.a, {
                                              style: {
                                                color: '#fff',
                                                wordBreak: 'break-word',
                                              },
                                              variant: 'h6',
                                              gutterBottom: true,
                                              children: 'Evidence',
                                            }),
                                          }),
                                        }),
                                        Object(PZ.jsx)(Kf.b, {
                                          to: '/properties',
                                          onClick: function () {
                                            return hm(7);
                                          },
                                          style: {
                                            color: '#fff',
                                            textDecoration: 'none',
                                          },
                                          children: Object(PZ.jsx)('div', {
                                            className: 7 === dl ? 'mdw-tab active-tab' : 'mdw-tab',
                                            style: {
                                              display: dV || 'ems' === hZ ? 'none' : '',
                                            },
                                            children: Object(PZ.jsx)(Pk.a, {
                                              style: {
                                                color: '#fff',
                                                wordBreak: 'break-word',
                                              },
                                              variant: 'h6',
                                              gutterBottom: true,
                                              children: 'Properties',
                                            }),
                                          }),
                                        }),
                                        Object(PZ.jsx)(Kf.b, {
                                          to: '/charges',
                                          onClick: function () {
                                            return hm(8);
                                          },
                                          style: {
                                            color: '#fff',
                                            textDecoration: 'none',
                                          },
                                          children: Object(PZ.jsx)('div', {
                                            className: 8 === dl ? 'mdw-tab active-tab' : 'mdw-tab',
                                            style: {
                                              display: dV || 'ems' === hZ ? 'none' : '',
                                            },
                                            children: Object(PZ.jsx)(Pk.a, {
                                              style: {
                                                color: '#fff',
                                                wordBreak: 'break-word',
                                              },
                                              variant: 'h6',
                                              gutterBottom: true,
                                              children: 'Charges',
                                            }),
                                          }),
                                        }),
                                        Object(PZ.jsx)(Kf.b, {
                                          to: '/staff',
                                          onClick: function () {
                                            return hm(9);
                                          },
                                          style: {
                                            color: '#fff',
                                            textDecoration: 'none',
                                          },
                                          children: Object(PZ.jsx)('div', {
                                            className: 9 === dl ? 'mdw-tab active-tab' : 'mdw-tab',
                                            style: {
                                              display: 'police' === hZ && '9' === dm ? '' : 'none',
                                            },
                                            children: Object(PZ.jsx)(Pk.a, {
                                              style: {
                                                color: '#fff',
                                                wordBreak: 'break-word',
                                              },
                                              variant: 'h6',
                                              gutterBottom: true,
                                              children: 'Staff',
                                            }),
                                          }),
                                        }),
                                        Object(PZ.jsx)(Kf.b, {
                                          to: '/legislation',
                                          onClick: function () {
                                            return hm(10);
                                          },
                                          style: {
                                            color: '#fff',
                                            textDecoration: 'none',
                                          },
                                          children: Object(PZ.jsx)('div', {
                                            className: 10 === dl ? 'mdw-tab active-tab' : 'mdw-tab',
                                            style: {
                                              display: dV || 'ems' === hZ ? 'none' : '',
                                            },
                                            children: Object(PZ.jsx)(Pk.a, {
                                              style: {
                                                color: '#fff',
                                                wordBreak: 'break-word',
                                              },
                                              variant: 'h6',
                                              gutterBottom: true,
                                              children: 'Legislation',
                                            }),
                                          }),
                                        }),
                                        Object(PZ.jsx)(Kf.b, {
                                          to: '/businesses',
                                          onClick: function () {
                                            return hm(11);
                                          },
                                          style: {
                                            color: '#fff',
                                            textDecoration: 'none',
                                          },
                                          children: Object(PZ.jsx)('div', {
                                            className: 11 === dl ? 'mdw-tab active-tab' : 'mdw-tab',
                                            style: {
                                              display: dV || 'ems' === hZ ? 'none' : '',
                                            },
                                            children: Object(PZ.jsx)(Pk.a, {
                                              style: {
                                                color: '#fff',
                                                wordBreak: 'break-word',
                                              },
                                              variant: 'h6',
                                              gutterBottom: true,
                                              children: 'Businesses',
                                            }),
                                          }),
                                        }),
                                      ],
                                    }),
                                  }),
                                }),
                                Object(PZ.jsx)(Ki.c, {
                                  children: Object(PZ.jsx)(Ki.a, {
                                    path: '/dashboard',
                                    render: function () {
                                      return Object(PZ.jsx)(Pa, {});
                                    },
                                  }),
                                }),
                                Object(PZ.jsx)(Ki.c, {
                                  children: Object(PZ.jsx)(Ki.a, {
                                    path: '/incidents',
                                    render: function () {
                                      return Object(PZ.jsx)(Pl, {});
                                    },
                                  }),
                                }),
                                Object(PZ.jsx)(Ki.c, {
                                  children: Object(PZ.jsx)(Ki.a, {
                                    path: '/incidentsems',
                                    render: function () {
                                      return Object(PZ.jsx)(PD, {});
                                    },
                                  }),
                                }),
                                Object(PZ.jsx)(Ki.c, {
                                  children: Object(PZ.jsx)(Ki.a, {
                                    path: '/profiles',
                                    render: function () {
                                      return Object(PZ.jsx)(PR, {});
                                    },
                                  }),
                                }),
                                Object(PZ.jsx)(Ki.c, {
                                  children: Object(PZ.jsx)(Ki.a, {
                                    path: '/dmv',
                                    render: function () {
                                      return Object(PZ.jsx)(Pt, {});
                                    },
                                  }),
                                }),
                                Object(PZ.jsx)(Ki.c, {
                                  children: Object(PZ.jsx)(Ki.a, {
                                    path: '/evidence',
                                    render: function () {
                                      return Object(PZ.jsx)(PC, {});
                                    },
                                  }),
                                }),
                                Object(PZ.jsx)(Ki.c, {
                                  children: Object(PZ.jsx)(Ki.a, {
                                    path: '/properties',
                                    render: function () {
                                      return Object(PZ.jsx)(PN, {});
                                    },
                                  }),
                                }),
                                Object(PZ.jsx)(Ki.c, {
                                  children: Object(PZ.jsx)(Ki.a, {
                                    path: '/charges',
                                    render: function () {
                                      return Object(PZ.jsx)(d0, {});
                                    },
                                  }),
                                }),
                                Object(PZ.jsx)(Ki.c, {
                                  children: Object(PZ.jsx)(Ki.a, {
                                    path: '/businesses',
                                    render: function () {
                                      return Object(PZ.jsx)(d2, {});
                                    },
                                  }),
                                }),
                                Object(PZ.jsx)(Ki.c, {
                                  children: Object(PZ.jsx)(Ki.a, {
                                    path: '/staff',
                                    render: function () {
                                      return Object(PZ.jsx)(d9, {});
                                    },
                                  }),
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                    }),
                  }),
                ],
              }),
            })
          );
        };
      K2(730);
      K2(731);
      K2(732);
      K2(733);
      K7.a.render(
        Object(PZ.jsx)(Kf.a, {
          basename: '/',
          children: Object(PZ.jsx)(Kb.a, { children: Object(PZ.jsx)(dP, {}) }),
        }),
        document.getElementById('root'),
      );
    },
  },
  [[734, 1, 2]],
]);
