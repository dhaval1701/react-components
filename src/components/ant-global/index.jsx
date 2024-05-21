import React, { useDebugValue, useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { DefaultPerPage, urlDecode } from "../../../../config";
import IvcsrTable from "../../../../component/ivcsr-table";
import { Popover, Tag, message } from "antd";
import Loading from "../../../../component/loading";
import NoData from "../../../../component/no-data";
import SpApiModal from "./lib/sp-api-modal";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import { GlobalContext } from "../../../../commonContext";
import WalmartCredential from "./lib/walmart-credential";
import AdvAmazonModal from "./lib/adv-amazon-modal";
export default function (props) {
  const {
    GetMarketplaceCred,
    GetRegionList,
    GetRegionWiseMarketplaceList,
    fakeActionMarketplaceCred,
    SPGenerateRefreshTokenAction,
    AdvGenerateRefreshTokenAction,
  } = props;

  const contextVar = useContext(GlobalContext);

  const GetMarketplaceCredListRes = useSelector(
    (state) => state.MarketplaceCredential.GetMarketplaceCredListResponse || {}
  );
  const GetRegionListRes = useSelector(
    (state) => state.MarketplaceCredential.GetRegionListResponse || {}
  );
  const SPGenerateRefreshRes = useSelector(
    (state) => state.MarketplaceCredential.SPGenerateRefreshResponse || {}
  );
  const ADVGenerateRefreshRes = useSelector(
    (state) => state.MarketplaceCredential.ADVGenerateRefreshResponse || {}
  );

  const [advProfileData, setAdvProfileData] = useState([]);
  const [isOpenAdvModal, setOpenAdvModal] = useState(false);
  const [profileIds, setProfileIds] = useState([]);

  const AppId = JSON.parse(
    localStorage.getItem("userCredential")
  )?.lwa_application_id;

  const CallBackAdsUrl = JSON.parse(
    localStorage.getItem("userCredential")
  )?.advertising_return_url;

  const callBackAdsSellerName =
    JSON.parse(localStorage.getItem("user"))?.seller_name || "test";

  const callBackcAdsClientId = JSON.parse(
    localStorage.getItem("userCredential")
  )?.advertising_client_id;
  // console.log(
  //   CallBackAdsUrl,
  //   callBackAdsSellerName,
  //   callBackcAdsClientId,
  //   "-----------  CallBackAdsUrl"
  // );
  const [selectedTab, setSelectedTab] = useState("SP-API");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize, setPageSize] = useState(DefaultPerPage);
  const [openingSpCredModal, setOpeningSpCredModal] = useState(false);
  const [isOpenSpCredModal, setIsOpenSpCredModal] = useState(false);
  const [regionList, setRegionList] = useState(false);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    GetMarketplaceCred();
  }, []);

  // useEffect(() => {
  //   GetMarketplaceCred();
  // }, [contextVar?.data?.marketplaceType]);

  useEffect(() => {
    if (GetMarketplaceCredListRes.status === true) {
      const filterObj = GetMarketplaceCredListRes?.data?.filter(
        (d) => d?.credential_type === selectedTab
      );
      if (selectedTab === "Advertising-API") {
        filterObj?.map((d) => {
          // console.log(d, "d----");
          profileIds.push(JSON.parse(d?.credential_details)?.profile_id);
        });
      }
      setProfileIds(profileIds);
      // console.log(profileIds, "profileIds");
      setList(filterObj);
      setLoading(false);
      setTotalPage(GetMarketplaceCredListRes?.data?.pagination?.totalCount);
      fakeActionMarketplaceCred("GetMarketplaceCredListResponse");
    } else if (GetMarketplaceCredListRes.status === false) {
      setLoading(false);
      fakeActionMarketplaceCred("GetMarketplaceCredListResponse");
    }
  }, [GetMarketplaceCredListRes]);

  useEffect(() => {
    if (GetRegionListRes.status === true) {
      setOpeningSpCredModal(false);
      setIsOpenSpCredModal(true);
      const newData = Object.entries(GetRegionListRes?.data)?.map((d) => {
        // console.log(d, "--------- d");
        return { label: d?.[1]?.name, value: d?.[0], url: d?.[1]?.url };
      });
      setRegionList(newData);
      fakeActionMarketplaceCred("GetRegionListResponse");
    } else if (GetRegionListRes.status === false) {
      setLoading(false);
      fakeActionMarketplaceCred("GetRegionListResponse");
    }
  }, [GetRegionListRes]);

  useEffect(() => {
    if (SPGenerateRefreshRes.status === true) {
      localStorage.removeItem("other_marketplace");
      GetMarketplaceCred();
      setSelectedTab("SP-API");
      setTimeout(() => {
        history.replace("/spapi-callback");
      }, 1000);
      fakeActionMarketplaceCred("SPGenerateRefreshResponse");
    } else if (SPGenerateRefreshRes.status === false) {
      history.replace("/spapi-callback");
      fakeActionMarketplaceCred("SPGenerateRefreshResponse");
    }
  }, [SPGenerateRefreshRes]);

  useEffect(() => {
    if (ADVGenerateRefreshRes.status === true) {
      // console.log(ADVGenerateRefreshRes, "ADVGenerateRefreshRes");
      setAdvProfileData(JSON.parse(ADVGenerateRefreshRes?.data));
      message.destroy();
      setOpenAdvModal(true);
      fakeActionMarketplaceCred("ADVGenerateRefreshResponse");
    } else if (ADVGenerateRefreshRes.status === false) {
      history.replace("/callbackads");
      fakeActionMarketplaceCred("ADVGenerateRefreshResponse");
    }
  }, [ADVGenerateRefreshRes]);

  // useEffect(() => {
  //   const newData = {
  //     code: "200",
  //     status: true,
  //     message: "Advertising Profile Data",
  //     data: '[{"profileId":4239184363836371,"countryCode":"CA","currencyCode":"CAD","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"A2EUQ1WTGCTBG2","id":"A18GUKKYA7R5ZS","type":"seller","name":"TINT BRAND","validPaymentMethod":true}},{"profileId":1696169587137099,"countryCode":"CA","currencyCode":"CAD","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"A2EUQ1WTGCTBG2","id":"A1ADB2ICYBANZ1","type":"seller","name":"freshleafbrands","validPaymentMethod":true}},{"profileId":4236533917193721,"countryCode":"CA","currencyCode":"CAD","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"A2EUQ1WTGCTBG2","id":"A3UGFV2RY0Q2D4","type":"seller","name":"Inkjetsclub","validPaymentMethod":true}},{"profileId":3319013369454121,"countryCode":"CA","currencyCode":"CAD","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"A2EUQ1WTGCTBG2","id":"A1KJJ724D0ONYF","type":"seller","name":"GHOST Lifestyle","validPaymentMethod":true}},{"profileId":1812399771396914,"countryCode":"CA","currencyCode":"CAD","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"A2EUQ1WTGCTBG2","id":"A20COV0GZ0JZAE","type":"seller","name":"WILBEK","validPaymentMethod":true}},{"profileId":4241927453917303,"countryCode":"CA","currencyCode":"CAD","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"A2EUQ1WTGCTBG2","id":"A2ELB31MVOQYN","type":"seller","name":"Andor Products","validPaymentMethod":true}},{"profileId":1162476106218665,"countryCode":"CA","currencyCode":"CAD","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"A2EUQ1WTGCTBG2","id":"A38I4NYGS03BS3","type":"seller","name":"Freshtees","validPaymentMethod":true}},{"profileId":2607335748972739,"countryCode":"CA","currencyCode":"CAD","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"A2EUQ1WTGCTBG2","id":"A34ZO1RONIKHN5","type":"seller","name":"Eden & Co","validPaymentMethod":true}},{"profileId":2942870744555034,"countryCode":"MX","currencyCode":"MXN","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"A1AM78C64UM0Y8","id":"A3UGFV2RY0Q2D4","type":"seller","name":"InkjetsClubStore","validPaymentMethod":false}},{"profileId":1653824600901290,"countryCode":"MX","currencyCode":"MXN","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"A1AM78C64UM0Y8","id":"A34ZO1RONIKHN5","type":"seller","name":"Eden & Co","validPaymentMethod":true}},{"profileId":2597518079980776,"countryCode":"MX","currencyCode":"MXN","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"A1AM78C64UM0Y8","id":"A38I4NYGS03BS3","type":"seller","name":"Freshtees","validPaymentMethod":true}},{"profileId":4347214106288762,"countryCode":"MX","currencyCode":"MXN","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"A1AM78C64UM0Y8","id":"A1KJJ724D0ONYF","type":"seller","name":"GHOST Lifestyle","validPaymentMethod":true}},{"profileId":580511139853585,"countryCode":"MX","currencyCode":"MXN","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"A1AM78C64UM0Y8","id":"A2ELB31MVOQYN","type":"seller","name":"Andor Products","validPaymentMethod":true}},{"profileId":2421906346341918,"countryCode":"MX","currencyCode":"MXN","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"A1AM78C64UM0Y8","id":"A20COV0GZ0JZAE","type":"seller","name":"WILBEK","validPaymentMethod":true}},{"profileId":3074380967304304,"countryCode":"MX","currencyCode":"MXN","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"A1AM78C64UM0Y8","id":"A1ADB2ICYBANZ1","type":"seller","name":"FLB - MEXICO","validPaymentMethod":true}},{"profileId":1814081226352635,"countryCode":"MX","currencyCode":"MXN","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"A1AM78C64UM0Y8","id":"A18GUKKYA7R5ZS","type":"seller","name":"TINT BRAND","validPaymentMethod":true}},{"profileId":738080677021739,"countryCode":"US","currencyCode":"USD","dailyBudget":1400.0,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"ATVPDKIKX0DER","id":"A1ADB2ICYBANZ1","type":"seller","name":"freshleafbooks","validPaymentMethod":true}},{"profileId":1822502984634758,"countryCode":"US","currencyCode":"USD","dailyBudget":90.0,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"ATVPDKIKX0DER","id":"A2ELB31MVOQYN","type":"seller","name":"Andor Products","validPaymentMethod":true}},{"profileId":1963087545131240,"countryCode":"US","currencyCode":"USD","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"ATVPDKIKX0DER","id":"A18GUKKYA7R5ZS","type":"seller","name":"TINT BRAND","validPaymentMethod":true}},{"profileId":3106196446354050,"countryCode":"US","currencyCode":"USD","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"ATVPDKIKX0DER","id":"A38I4NYGS03BS3","type":"seller","name":"Freshtees","validPaymentMethod":true}},{"profileId":4325616024826684,"countryCode":"US","currencyCode":"USD","dailyBudget":20.0,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"ATVPDKIKX0DER","id":"A3JC9W193JPP33","type":"seller","name":"OuterFactor™","validPaymentMethod":true}},{"profileId":2578002650291634,"countryCode":"US","currencyCode":"USD","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"ATVPDKIKX0DER","id":"ALV0KGTVGSIFI","type":"seller","name":"ZonFlip Distribution","validPaymentMethod":true}},{"profileId":1420347829830019,"countryCode":"US","currencyCode":"USD","dailyBudget":2.1E7,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"ATVPDKIKX0DER","id":"A34ZO1RONIKHN5","type":"seller","name":"Eden & Co","validPaymentMethod":true}},{"profileId":1020840569362545,"countryCode":"US","currencyCode":"USD","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"ATVPDKIKX0DER","id":"A3HRADO870FOJ1","type":"seller","name":"Matterkids","validPaymentMethod":true}},{"profileId":2329844429346976,"countryCode":"US","currencyCode":"USD","dailyBudget":35.0,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"ATVPDKIKX0DER","id":"A20COV0GZ0JZAE","type":"seller","name":"WILBEK","validPaymentMethod":true}},{"profileId":1272913209651347,"countryCode":"US","currencyCode":"USD","dailyBudget":60.0,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"ATVPDKIKX0DER","id":"A3KJTYBURUMLLL","type":"seller","name":"Bucklebee","validPaymentMethod":true}},{"profileId":1907704888726023,"countryCode":"US","currencyCode":"USD","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"ATVPDKIKX0DER","id":"A3UGFV2RY0Q2D4","type":"seller","name":"Burkwitz Solutions","validPaymentMethod":true}},{"profileId":3152264916546005,"countryCode":"US","currencyCode":"USD","dailyBudget":9000.0,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"ATVPDKIKX0DER","id":"A1KJJ724D0ONYF","type":"seller","name":"GHOST Lifestyle","validPaymentMethod":true}},{"profileId":3964718606572141,"countryCode":"US","currencyCode":"USD","dailyBudget":1000.0,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"ATVPDKIKX0DER","id":"A2O4BP8UDMPXNV","type":"seller","name":"ECOMM Distribution","validPaymentMethod":true}},{"profileId":2948082117033599,"countryCode":"US","currencyCode":"USD","dailyBudget":9.99999999E8,"timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"ATVPDKIKX0DER","id":"A24N13W0TGIURN","type":"seller","name":"The SmartHome Stores","validPaymentMethod":true}},{"profileId":4115017485579621,"countryCode":"US","currencyCode":"USD","timezone":"America/Los_Angeles","accountInfo":{"marketplaceStringId":"ATVPDKIKX0DER","id":"ENTITY2MIE6AV97MQTE","type":"vendor","name":"Max Sigurdson-Scott","validPaymentMethod":false}}]',
  //     error: [],
  //   };
  //   console.log(ADVGenerateRefreshRes, "ADVGenerateRefreshRes");
  //   setAdvProfileData(JSON.parse(newData?.data));
  //   setOpenAdvModal(true);
  //   fakeActionMarketplaceCred("ADVGenerateRefreshResponse");
  // }, []);

  useEffect(() => {
    // console.log(location, "-------------------------LocationLocation");
    if (location.pathname === "/spapi-callback") {
      // history.replace("/spapi-callback");
      setSelectedTab("SP-API");
      if (location.search) {
        const { selling_partner_id, spapi_oauth_code, state } =
          urlDecode(location);

        const dataView = {
          spapi_oauth_code: spapi_oauth_code,
          selling_partner_id: selling_partner_id,
          app_id: AppId,
          seller_name: state?.split("!!")?.[1] || "",
          marketplace_id: state?.split("!!")?.[3] || "",
          other_marketplace_ids: JSON.parse(
            localStorage.getItem("other_marketplace")
          ),
        };
        message.destroy();
        message.loading("Loading...");
        // console.log(dataView, "dataView");
        SPGenerateRefreshTokenAction(dataView);
      }
    } else if (location.pathname === "/callbackads") {
      setSelectedTab("Advertising-API");
      if (location.search) {
        const { code, marketplace_id, seller_name } = urlDecode(location);

        if (!code) {
          // start loading & call get API
          history.replace("/callbackads");
          return;
        }
        localStorage.setItem("adCode", code);
        history.replace("/callbackads");
        message.destroy();
        message.loading("Loading...", 0);

        const Obj = {
          ad_code: code,
          marketplace_id: "ATVPDKIKX0DER",
        };
        AdvGenerateRefreshTokenAction(Obj);
      }
    }
  }, [location]);

  useEffect(() => {
    if (selectedTab === "Advertising-API") {
      window.onAmazonLoginReady = function () {
        window.amazon.Login.setClientId(callBackcAdsClientId);
      };
      let a = document.createElement("script");
      a.type = "text/javascript";
      a.async = true;
      a.id = "amazon-login-sdk";
      a.src = "https://assets.loginwithamazon.com/sdk/na/login1.js";
      const getRoot = document.getElementById("amazon-root");
      getRoot.appendChild(a);
      return () => {};
    }
  }, [selectedTab]);

  const advCredColumns = [
    {
      title: "Sr.No.",
      render: (text) => {
        return <span>{text.key + 1}</span>;
      },
    },
    {
      title: "Seller Account Name",
      render: (text) => {
        // console.log(
        //   JSON.parse(text?.credential_details),
        //   "JSON.parse(text?.credential_details)"
        // );
        return (
          <span className="fw-bold">
            {JSON.parse(text?.credential_details)?.seller_name}
          </span>
        );
      },
    },
    {
      title: "Seller Type",
      render: (text) => {
        return (
          <Tag
            color={
              JSON.parse(text?.credential_details)?.seller_type === "vendor"
                ? "blue"
                : "success"
            }
            style={{ textTransform: "capitalize" }}
            className="fw-bold"
          >
            {" "}
            {JSON.parse(text?.credential_details)?.seller_type}
          </Tag>
        );
      },
    },
    {
      title: "Profile ID",
      render: (text) => {
        return <span>{JSON.parse(text?.credential_details)?.profile_id}</span>;
      },
    },
    {
      title: "Client ID",
      render: (text) => {
        return <span>{JSON.parse(text?.credential_details)?.client_id}</span>;
      },
    },
    {
      title: "Country Code",
      render: (text) => {
        return (
          <span>{JSON.parse(text?.credential_details)?.country_code}</span>
        );
      },
    },
    {
      title: "Currency Code",
      render: (text) => {
        return (
          <span>{JSON.parse(text?.credential_details)?.currency_code}</span>
        );
      },
    },
    {
      title: "Time Zone",
      render: (text) => {
        return <span>{JSON.parse(text?.credential_details)?.time_zone}</span>;
      },
    },
    {
      title: "Created At",
      render: (text) => {
        return (
          <span>
            {moment(new Date(text?.created_at * 1000)).format(
              "MMM DD, YYYY hh:mm A"
            )}
          </span>
        );
      },
    },
    {
      title: "Updated At",
      render: (text) => {
        return (
          <span>
            {moment(new Date(text?.updated_at * 1000)).format(
              "MMM DD, YYYY hh:mm A"
            )}
          </span>
        );
      },
    },
  ];

  const spApiCredColumns = [
    {
      title: "Sr.No.",
      render: (text) => {
        return <span>{text.key + 1}</span>;
      },
    },
    {
      title: "Seller Name",
      render: (text) => {
        return (
          <span>
            {JSON.parse(text?.credential_details)?.seller_name?.replace(
              "%20",
              " "
            )}
          </span>
        );
      },
    },
    {
      title: "ARN",
      render: (text) => {
        return <span>{JSON.parse(text?.credential_details)?.role_arn}</span>;
      },
    },
    {
      title: "Region",
      render: (text) => {
        return <span>{JSON.parse(text?.credential_details)?.region}</span>;
      },
    },
    {
      title: "Marketplace",
      render: (text) => {
        return <span>{text?.marketplace}</span>;
      },
    },
    {
      title: "AWS Access Key",
      render: (text) => {
        return <span>{JSON.parse(text?.credential_details)?.access_key}</span>;
      },
    },
    {
      title: "AWS Secret Key",
      render: (text) => {
        return <span>{JSON.parse(text?.credential_details)?.secret_key}</span>;
      },
    },
    {
      title: "Refresh Token",
      render: (text) => {
        return (
          <Popover
            content={
              <div
                style={{
                  height: "100px",
                  width: "400px",
                  overflowY: "scroll",
                }}
              >
                {JSON.parse(text?.credential_details)?.refresh_token}
              </div>
            }
            placement="bottom"
          >
            <div className="popoverActionIcon" style={{ width: "200px" }}>
              {JSON.parse(text?.credential_details)?.refresh_token}
            </div>
          </Popover>
        );
      },
    },
    // {
    //   title: "VAT Setting",
    //   render: (text) => {
    //     return <span>{text?.arn}</span>;
    //   },
    // },
    {
      title: "Created At",

      render: (text) => {
        return (
          <span>
            {moment(new Date(text?.created_at * 1000)).format("MMM DD, YYYY")}
          </span>
        );
      },
    },
    {
      title: "Updated At",

      render: (text) => {
        return (
          <span>
            {moment(new Date(text?.updated_at * 1000)).format("MMM DD, YYYY")}
          </span>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <div className="d-flex flex-column flex-column-fluid">
          <div id="kt_app_content" className="app-content flex-column-fluid">
            <div
              id="kt_app_content_container"
              className="app-container container-fluid"
            >
              {contextVar?.data?.marketplaceType === "amazon" && (
                <>
                  <div className="row">
                    <div className="col-md-12 cus-tab">
                      <ul className="nav nav-pills mb-5 fs-6">
                        <li
                          className="nav-item"
                          onClick={() => {
                            setLoading(true);
                            setSelectedTab("SP-API");
                            history.replace("/spapi-callback");
                            GetMarketplaceCred();
                          }}
                        >
                          <span
                            className={`nav-link ${
                              selectedTab === "SP-API" && "active"
                            }  fs-7 fw-bold py-3 px-7 me-2 bg-white`}
                          >
                            {/* {contextVar?.data?.marketplaceType === "amazon"
                          ? "Amazon SP API Credentials"
                          : "Walmart SP API Credentials"} */}
                            Amazon SP API Credentials
                          </span>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => {
                            setLoading(true);
                            setSelectedTab("Advertising-API");
                            history.replace("/callbackads");
                            GetMarketplaceCred();
                          }}
                        >
                          <span
                            className={`nav-link  ${
                              selectedTab === "Advertising-API" && "active"
                            }  fs-7 fw-bold py-3 px-7 me-2 bg-white`}
                          >
                            {/* {contextVar?.data?.marketplaceType === "amazon"
                          ? "Amazon Advertising Credentials"
                          : "Walmart Advertising Credentials"} */}
                            Amazon Advertising Credentials
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="tab-content" id="myTabContent">
                    {selectedTab === "SP-API" && (
                      <div
                        className={`tab-pane fade ${
                          selectedTab === "SP-API" && "show active"
                        }`}
                        role="tabpanel"
                      >
                        <div className="row gy-5 g-xl-5">
                          <div className="col-xxl-12">
                            <div className="card card-xxl-stretch mb-5 mb-xl-8">
                              <div className="card-header border-bottom-dashed">
                                <h3 className="card-title align-items-start flex-column">
                                  <span className="card-label fw-bolder text-dark">
                                    {/* {contextVar?.data?.marketplaceType === "amazon"
                                  ? "Amazon SP API Credentials List"
                                  : "Walmart SP API Credentials List"} */}
                                    Amazon SP API Credentials List
                                  </span>
                                </h3>
                                <div className="card-toolbar">
                                  <div className="d-flex flex-stack flex-wrap gap-4">
                                    <button
                                      className="btn btn-primary"
                                      onClick={() => {
                                        setOpeningSpCredModal(true);
                                        GetRegionList();
                                      }}
                                    >
                                      Add New
                                      {openingSpCredModal && (
                                        <span className="spinner-border spinner-border-sm align-middle ms-2" />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="card-body py-2">
                                <div className="table-responsive">
                                  {loading ? (
                                    <Loading />
                                  ) : list?.length !== 0 ? (
                                    <IvcsrTable
                                      columns={spApiCredColumns}
                                      dataSource={list}
                                      pagination={false}
                                      scroll={{ x: "max-content" }}
                                    />
                                  ) : (
                                    <NoData />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedTab === "Advertising-API" && (
                      <div
                        className={`tab-pane fade ${
                          selectedTab === "Advertising-API" && "show active"
                        }`}
                        role="tabpanel"
                      >
                        <div className="row gy-5 g-xl-5">
                          <div className="col-xxl-12">
                            <div className="card card-xxl-stretch mb-5 mb-xl-8">
                              <div className="card-header border-bottom-dashed">
                                <h3 className="card-title align-items-start flex-column">
                                  <span className="card-label fw-bolder text-dark">
                                    {/* {contextVar?.data?.marketplaceType === "amazon"
                                  ? "Amazon Advertising Credentials List"
                                  : "Walmart Advertising Credentials List"} */}
                                    Amazon Advertising Credentials List
                                  </span>
                                </h3>
                                <div className="card-toolbar">
                                  <div id="amazon-root">
                                    <a
                                      id="LoginWithAmazon"
                                      style={{
                                        marginLeft: "10px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        let options = {};
                                        options.scope =
                                          "advertising::campaign_management";
                                        options.response_type = "code";
                                        window.amazon.Login.authorize(
                                          options,
                                          `${CallBackAdsUrl}?marketplace_id=ATVPDKIKX0DER&seller_name=${callBackAdsSellerName}`
                                        );
                                      }}
                                    >
                                      <img
                                        border="0"
                                        alt="Login with Amazon"
                                        src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png"
                                        width="156"
                                        height="32"
                                      />
                                    </a>
                                  </div>
                                  {/* <a
                                href
                                className="btn btn-warning fs-7 fw-bolder text-dark"
                              >
                                <i className="fab fa-amazon text-dark fs-2" />{" "}
                                Login with Amazon
                              </a> */}
                                </div>
                              </div>

                              <div className="card-body py-2">
                                <div className="table-responsive">
                                  {loading ? (
                                    <Loading />
                                  ) : list?.length !== 0 ? (
                                    <IvcsrTable
                                      columns={advCredColumns}
                                      dataSource={list}
                                      pagination={false}
                                      scroll={{ x: "max-content" }}
                                    />
                                  ) : (
                                    <NoData />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {contextVar?.data?.marketplaceType === "walmart" && (
                <WalmartCredential {...props} />
              )}
            </div>
          </div>
        </div>
      </div>
      {
        <SpApiModal
          show={isOpenSpCredModal}
          onHide={() => {
            setIsOpenSpCredModal(false);
            setRegionList([]);
          }}
          regionList={regionList}
          {...props}
        />
      }
      {isOpenAdvModal && (
        <AdvAmazonModal
          show={isOpenAdvModal}
          onHide={() => {
            setOpenAdvModal(false);
            GetMarketplaceCred();
          }}
          advProfileData={advProfileData}
          profileIds={profileIds}
          setProfileIds={setProfileIds}
          {...props}
        />
      )}
    </>
  );
}
