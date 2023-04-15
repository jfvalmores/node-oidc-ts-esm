import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';

const manageKey = (key: string): string => {
  return key.includes('(.*)') ? key.slice(0, -1) + '\\.js$' : key;
};

const manageMapper = (mapper: Record<string, string>): Record<string, string> => {
  const newMapper: Record<string, string> = {};
  for (const key in mapper) {
    newMapper[manageKey(key)] = mapper[key];
  }
  newMapper['^./(.*)\\.js$'] = './$1';
  return newMapper;
};

const config: Config.InitialOptions = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.m?[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
        useESM: true,
      },
    ],
  },
  moduleNameMapper: manageMapper(
    pathsToModuleNameMapper(
      {
        '@/*': ['./src/*'],
      },
      { prefix: '<rootDir>/' }
    ) as Record<string, string>
  ),
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

export default config;
