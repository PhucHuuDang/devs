"use client";

import { ColumnItemPlugin, ColumnPlugin } from "@platejs/layout/react";

import {
  ColumnElement,
  ColumnGroupElement,
} from "@/components/editor/_editor-components/column-node";

export const ColumnKit = [
  ColumnPlugin.withComponent(ColumnGroupElement),
  ColumnItemPlugin.withComponent(ColumnElement),
];
