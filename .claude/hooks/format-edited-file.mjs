// Claude Code PostToolUse hook: formats and safely auto-fixes a file with Biome
// right after Claude edits it. Never blocks: always exits 0.
import { spawnSync } from "node:child_process";
import path from "node:path";

const SUPPORTED = /\.(ts|cts|mts|js|cjs|mjs|json|jsonc|md)$/;
const GENERATED =
	/(^|[\\/])(lib|docs|coverage|reports|node_modules|\.stryker-tmp)[\\/]/;

let input = "";
process.stdin.on("data", (chunk) => {
	input += chunk;
});
process.stdin.on("end", () => {
	try {
		const filePath = JSON.parse(input)?.tool_input?.file_path ?? "";
		const projectDir = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
		const relative = path.relative(projectDir, filePath);

		if (
			!SUPPORTED.test(filePath) ||
			relative.startsWith("..") ||
			GENERATED.test(relative)
		) {
			return;
		}

		spawnSync(
			"npx",
			["biome", "check", "--write", "--no-errors-on-unmatched", filePath],
			{ cwd: projectDir, stdio: "ignore" },
		);
	} catch {
		// Ignore malformed input; formatting is best-effort.
	}
});
