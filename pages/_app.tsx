import React from "react";
import { AppProps } from "next/app";
import { Refine, GitHubBanner } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
  AuthPage,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-nextjs-router";
// import dataProvider, { GraphQLClient } from "@pankod/refine-hasura";
import  dataProvider from "@pankod/refine-nhost";

import "@pankod/refine-antd/dist/reset.css";
import { appWithTranslation, useTranslation } from "next-i18next";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import { ColorModeContextProvider } from "@contexts";
import { authProvider } from "src/authProvider";
import { Header } from "@components/layout";
import { OffLayoutArea } from "@components/offLayoutArea";
import { AdminPetsList } from './admin/pets/PetsList';
import { AdminProductsList } from './admin/products/ProductsList';
import { AdminOrdersList } from "./admin/orders/list";
import { AdminUsersList } from './admin/users/list';
import { AdminPaymentsList } from './admin/payments/list';
import  { NhostAuthProvider } from "@nhost/react-auth";

// const API_URL = "https://ctzrqiexgysncscklyqy.hasura.eu-west-2.nhost.run/console";

import { NhostClient } from "@nhost/nhost-js";
import { PetsList } from "./admin copy/pets/PetsList";
import { LocationsList } from "./admin copy/locations/list";
import { OrdersList } from "./admin copy/orders/list";
import { CardsList } from "./admin copy/card_details/list";
import { UsersList } from "./admin copy/users/list";

// import "../pages/loginPage.css";
import "../pages/LoginPage/loginPage.css"
import "../pages/LoginPage/wolfe.css";
import "../pages/LoginPage/epigenitics.css";
import "../pages/LoginPage/hairBulbFolicle.css";
import "../pages/LoginPage/product.styles.css";
import "../pages/LoginPage/s_DriveTechnology.css";

export const nhost = new NhostClient({
  backendUrl: "https://ctzrqiexgysncscklyqy.nhost.run",
});


const admin = [
  {
    name: "pets",
    list: AdminPetsList,
    // create:CreateUser
  },

  {
    name: "products",
    list: AdminProductsList,
    // create:CreateUser
  },
  {
    name: "orders",
    list: AdminOrdersList,
    // create:CreateUser
  },

  {
    name: "payments",
    list: AdminPaymentsList,
    // create:CreateUser
  },


  {
    name: "users",
    list: AdminUsersList,
    // create:CreateUser,
    // edit:EditUser
  },

];

const user: any = [
  {
    name: "pets",
    list: PetsList,
    // create:CreateUser
  },
  {
    name: "Locations",
    list: LocationsList,
    // create:CreateUser,
    // edit:EditUser
  },
  {
    name: "orders",
    list: OrdersList,
    // create:CreateUser
  },

  {
    name: "Card_Details",
    list: CardsList,
    // create:CreateUser
  },

  {
    name: "user",
    list: UsersList,
    // create:CreateUser,
    // edit:EditUser
  },
];

// const gqlDataProvider = dataProvider(client);

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <>
      {/* <GitHubBanner /> */}
<NhostAuthProvider nhost={nhost}>

      <ColorModeContextProvider>
        <RefineKbarProvider>
          <Refine
                      routerProvider={{
                        ...routerProvider,
                        // routes: [
                        //   {
                        //     element: <SignIn />,
                        //     path: "/login",
                        //   },
                        //   {
                        //     element: <Products />,
                        //     path: "/products-list",
                        //   },
                        //   {
                        //     element: <About />,
                        //     path: "/about",
                        //   },
                        //   // {
                        //   //   element: <ContactForm />,
                        //   //   path: "/contact",
                        //   // },
                        //   {
                        //     element: <LoginPage />,
                        //     path: "/help",
                        //   },
                        //   {
                        //     element: <Checkout />,
                        //     path: "/checkout",
                        //   },
                        //   {
                        //     element: <AdminOrdersDetailsList />,
                        //     path: "/admin/order/detail/:id",
                        //   },
            
                        //   {
                        //     element: <UserOrdersDetailsList />,
                        //     path: "/user/order/detail/:id",
                        //   },
                        //   // {
                        //   //   element: <Promo />,
                        //   //   path: "/promo",hairBulbFollicle
                        //   // },
                        //   {
                        //     element: <Success />,
                        //     path: "/sucess",
                        //   },
                        //   {
                        //     element: <SDriveTechnology />,
                        //     path: "/s_drive_technology",
                        //   },
                        //   {
                        //     element: <Epigenetics />,
                        //     path: "/epigenitics",
                        //   },
                        //   {
                        //     element: <HairBulbFollicle />,
                        //     path: "/hairBulbFollicle",
                        //   },
                        //   {
                        //     element: <Cancel />,
                        //     path: "/cancel",
                        //   },
                        //   {
                        //     element: <LoginPage />,
                        //     path: "/home",
                        //   },
                        //   {
                        //     element: <TermsConditions />,
                        //     path: "/terms",
                        //   },
                        // ],
                      }}
            dataProvider={dataProvider(nhost)}
            notificationProvider={notificationProvider}
            Layout={Layout}
            ReadyPage={ReadyPage}
            catchAll={<ErrorComponent />}
            authProvider={authProvider}
            LoginPage={AuthPage}
            i18nProvider={i18nProvider}
            Header={Header}
            OffLayoutArea={OffLayoutArea}
            resources={ admin }
            
          >
            <Component {...pageProps} />
          </Refine>
        </RefineKbarProvider>
      </ColorModeContextProvider>
      </NhostAuthProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
