<template>
	<div>
		<div v-if="editor" class="d-flex flex-wrap pa-1 ga-3 bg-surface-light">
			<div
				title="Insert table"
				class="pa-1 cursor-pointer"
				@click="
					editor
						.chain()
						.focus()
						.insertTable({ rows: 2, cols: 2, withHeaderRow: true })
						.run()
				"
			>
				<v-icon size="large">mdi-table-arrow-down</v-icon>
			</div>
			<div
				title="Remove table"
				class="pa-1 cursor-pointer"
				@click="editor.chain().focus().deleteTable().run()"
			>
				<v-icon size="large">mdi-table-cancel</v-icon>
			</div>
			<div
				title="Add column before"
				class="pa-1 cursor-pointer"
				@click="editor.chain().focus().addColumnBefore().run()"
			>
				<v-icon size="large">mdi-table-column-plus-before</v-icon>
			</div>
			<div
				title="Add column after"
				class="pa-1 cursor-pointer"
				@click="editor.chain().focus().addColumnAfter().run()"
			>
				<v-icon size="large">mdi-table-column-plus-after</v-icon>
			</div>
			<div
				title="Remove column"
				class="pa-1 cursor-pointer"
				@click="editor.chain().focus().deleteColumn().run()"
			>
				<v-icon size="large">mdi-table-column-remove</v-icon>
			</div>
			<div
				title="Add row before"
				class="pa-1 cursor-pointer"
				@click="editor.chain().focus().addRowBefore().run()"
			>
				<v-icon size="large">mdi-table-row-plus-before</v-icon>
			</div>
			<div
				title="Add row after"
				class="pa-1 cursor-pointer"
				@click="editor.chain().focus().addRowAfter().run()"
			>
				<v-icon size="large">mdi-table-row-plus-after</v-icon>
			</div>
			<div
				title="Remove row"
				class="pa-1 cursor-pointer"
				@click="editor.chain().focus().deleteRow().run()"
			>
				<v-icon size="large">mdi-table-row-remove</v-icon>
			</div>
			<div
				title="Link"
				@click="setLink"
				:class="{ 'bg-surface': editor.isActive('link') }"
				class="pa-1 cursor-pointer"
			>
				<v-icon size="large">mdi-link</v-icon>
			</div>

			<div
				title="Remove Link"
				@click="editor.chain().focus().unsetLink().run()"
				:class="{ 'bg-surface': editor.isActive('link') }"
				class="pa-1 cursor-pointer"
			>
				<v-icon size="large">mdi-link-off</v-icon>
			</div>
		</div>
		<editor-content :editor="editor" />
	</div>
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Link from "@tiptap/extension-link";

const props = defineProps({
	modelValue: {
		type: String,
		default: "",
	},
});

const emit = defineEmits(["update:modelValue"]);

const editor = useEditor({
	content: props.modelValue,
	onUpdate: () => {
		emit("update:modelValue", editor.value.getHTML());
	},
	extensions: [
		StarterKit,
		Link.configure({
			openOnClick: false,
			validate: (href) => /^https?:\/\//.test(href),
		}),
		Table.configure({
			resizable: true,
		}),
		TableRow,
		TableHeader,
		TableCell,
	],
	editorProps: {
		attributes: {
			class: "border-md border-surface-bright editor-height pa-4",
		},
	},
});

const setLink = () => {
	console.log(editor.value);
	const previousUrl = editor.value.getAttributes("link").href;
	const url = window.prompt("URL", previousUrl);

	// cancelled
	if (url === null) {
		return;
	}

	// empty
	if (url === "") {
		editor.value.chain().focus().extendMarkRange("link").unsetLink().run();

		return;
	}

	// update link
	editor.value
		.chain()
		.focus()
		.extendMarkRange("link")
		.setLink({ href: url })
		.run();
};
</script>

<style scoped lang="scss">
:deep(table) {
	border-collapse: collapse;
	table-layout: fixed;
	width: 100%;
	margin: 0;
	overflow: hidden;

	td,
	th {
		min-width: 1em;
		border: 1px solid rgb(66, 66, 66);
		padding: 3px 5px;
		vertical-align: top;
		box-sizing: border-box;
		position: relative;

		> * {
			margin-bottom: 0;
		}
	}

	th {
		font-weight: bold;
		text-align: left;
		background-color: rgb(0, 96, 100);
	}

	.selectedCell:after {
		z-index: 2;
		position: absolute;
		content: "";
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(200, 200, 255, 0.4);
		pointer-events: none;
	}

	.column-resize-handle {
		position: absolute;
		right: -2px;
		top: 0;
		bottom: -2px;
		width: 4px;
		background-color: #adf;
		pointer-events: none;
	}

	p {
		margin: 0;
	}
}

:deep(.tableWrapper) {
	padding: 1rem 0;
	overflow-x: auto;
}

:deep(.resize-cursor) {
	cursor: ew-resize;
	cursor: col-resize;
}
</style>
