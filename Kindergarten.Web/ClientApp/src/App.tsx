import * as React from "react";
import { Route } from "react-router-dom";

import { Layout } from "@components/Layout";
import { AsyncComponent } from "@core/HOC/AsyncComponent";

// <Route exact path="/Visitation" component={AsyncComponent(() => import(/* webpackChunkName: "Visitation" */ "@src/components/Visitation"))} />
export const AppRoutes = (
  <Layout>
    <Route exact path="/" component={AsyncComponent(() => import(/* webpackChunkName: "Home" */ "@src/components/Home"))} />
    <Route exact path="/Chat" component={AsyncComponent(() => import(/* webpackChunkName: "Chat" */ "@src/components/Chat"))} />
  </Layout>
);
