function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

declare function require(string);
requireAll((require as any).context("./src", true, /^\.\/.*\.ts$/));

import * as root from './src/root';
export = root;
