import * as React from "react";
import { Route } from "react-router-dom";

import { Layout } from "@components/Layout";
import { AsyncComponent } from "@core/HOC/AsyncComponent";

export const AppRoutes = (
  <Layout>
    <Route exact path="/" component={AsyncComponent(() => import(/* webpackChunkName: "Home" */ "@components/Home"))} />
    <Route path="/Post/:id" component={AsyncComponent(() => import(/* webpackChunkName: "Home.Post.View" */ "@components/Home/Components/View")) } />
    <Route path="/Edit/:id" component={AsyncComponent(() => import(/* webpackChunkName: "Home.Post.Edit" */ "@components/Home/Components/Edit")) } />
    <Route exact path="/Medicament" component={AsyncComponent(() => import(/* webpackChunkName: "Medicament" */ "@components/Medicament"))} />
    <Route exact path="/ChildrenGroups" component={AsyncComponent(() => import(/* webpackChunkName: "ChildrenGroups" */ "@components/ChildrenGroups"))} />
    <Route path="/Group/:groupId" component={AsyncComponent(() => import(/* webpackChunkName: "Group" */ "@components/Group"))} />
    <Route path="/Children/:childrenId" component={AsyncComponent(() => import(/* webpackChunkName: "Children" */ "@components/Children"))} />
    <Route path="/Search" component={AsyncComponent(() => import(/* webpackChunkName: "Search" */ "@components/Search"))} />
  </Layout>
);
