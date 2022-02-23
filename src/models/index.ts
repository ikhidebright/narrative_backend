/* eslint-disable @typescript-eslint/no-var-requires */
import { Sequelize, Model } from "sequelize";
import fs from "fs";
import path from "path";

function getFiles() {
  const files: string[] = [];
  const baseDir = __dirname;
  fs.readdirSync(baseDir).forEach((fileName) => {
    if (fileName.endsWith(".model.ts") || fileName.endsWith(".model.js")) {
      const filePath = path.resolve(baseDir, fileName);
      files.push(filePath);
    }
  });
  return files;
}

function importInitFunctions(files: string[]) {
  return files
    .map((file) => require(file).init)
    .filter((init) => Boolean(init));
}

export function connectModels(sequelize: Sequelize): void {
  const files = getFiles();
  const inits = importInitFunctions(files);
  for (const init of inits) {
    init.connectModelAttrs(sequelize);
  }
  for (const init of inits) {
    init.connectModelAssocs();
  }
}

function importModelExports(files: string[]) {
  return files
    .map((file) => {
      const { init, ...rest } = require(file);
      return rest;
    })
    .filter((model) => Boolean(model));
}

function getModel(mod: any) {
  for (const key in mod) {
    if (mod[key]?.prototype instanceof Model)
      return { name: key, model: mod[key] };
  }
}

export function registerModels(cb: (token: string, value: any) => any) {
  const files = getFiles();
  const modelExports = importModelExports(files);
  const models = modelExports.map(getModel).filter((model) => Boolean(model));
  models.forEach((model) => {
    const token = `${model.name}Model`;
    cb(token, model.model);
  });
}
