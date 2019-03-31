import * as React from "react";
import { Route } from "react-router-dom";

import { Layout } from "@components/Layout";
import { AsyncComponent } from "@core/HOC/AsyncComponent";

// <Route exact path="/Visitation" component={AsyncComponent(() => import(/* webpackChunkName: "Visitation" */ "@src/components/Visitation"))} />
export const AppRoutes = (
  <Layout>
    <Route exact path="/" component={AsyncComponent(() => import(/* webpackChunkName: "Home" */ "@components/Home"))} />
    <Route path="/Post/:id" component={AsyncComponent(() => import(/* webpackChunkName: "Home.Post.View" */ "@components/Home/Components/View")) } />
    <Route path="/Edit/:id" component={AsyncComponent(() => import(/* webpackChunkName: "Home.Post.Edit" */ "@components/Home/Components/Edit")) } />
    <Route exact path="/Chat" component={AsyncComponent(() => import(/* webpackChunkName: "Chat" */ "@components/Chat"))} />
  </Layout>
);
