<template>
	<div>
		<div v-if="editor" class="d-flex flex-wrap pa-1 ga-3 bg-surface-light">
			<div
				title="Bold"
				@click="editor.chain().focus().toggleBold().run()"
				:disabled="!editor.can().chain().focus().toggleBold().run()"
				:class="{ 'bg-surface': editor.isActive('bold') }"
				class="pa-1 cursor-pointer"
			>
				<v-icon size="large">mdi-format-bold</v-icon>
			</div>
			<div
				title="Italic"
				@click="editor.chain().focus().toggleItalic().run()"
				:disabled="!editor.can().chain().focus().toggleItalic().run()"
				:class="{ 'bg-surface': editor.isActive('italic') }"
				class="pa-1 cursor-pointer"
			>
				<v-icon size="large">mdi-format-italic</v-icon>
			</div>
			<div
				title="Strike Through"
				@click="editor.chain().focus().toggleStrike().run()"
				:disabled="!editor.can().chain().focus().toggleStrike().run()"
				:class="{ 'bg-surface': editor.isActive('strike') }"
				class="pa-1 cursor-pointer"
			>
				<v-icon size="large">mdi-format-strikethrough</v-icon>
			</div>
			<div
				title="Paragraph"
				@click="editor.chain().focus().setParagraph().run()"
				:class="{ 'bg-surface': editor.isActive('paragraph') }"
				class="pa-1 cursor-pointer"
			>
				<v-icon size="large">mdi-format-paragraph</v-icon>
			</div>

			<div
				title="H2"
				@click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
				:class="{ 'bg-surface': editor.isActive('heading', { level: 2 }) }"
				class="pa-1 cursor-pointer"
			>
				<v-icon size="large">mdi-format-header-2</v-icon>
			</div>
			<div
				title="H3"
				@click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
				:class="{ 'bg-surface': editor.isActive('heading', { level: 3 }) }"
				class="pa-1 cursor-pointer"
			>
				<v-icon size="large">mdi-format-header-3</v-icon>
			</div>
			<div
				title="H4"
				@click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
				:class="{ 'bg-surface': editor.isActive('heading', { level: 4 }) }"
				class="pa-1 cursor-pointer"
			>
				<v-icon size="large">mdi-format-header-4</v-icon>
			</div>
			<div
				title="Bullet list"
				@click="editor.chain().focus().toggleBulletList().run()"
				:class="{ 'bg-surface': editor.isActive('bulletList') }"
				class="pa-1 cursor-pointer"
			>
				<v-icon size="large">mdi-format-list-bulleted</v-icon>
			</div>
			<div
				title="Ordered list"
				@click="editor.chain().focus().toggleOrderedList().run()"
				:class="{ 'bg-surface': editor.isActive('orderedList') }"
				class="pa-1 cursor-pointer"
			>
				<v-icon size="large">mdi-order-numeric-ascending</v-icon>
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

<style scoped lang="scss"></style>
