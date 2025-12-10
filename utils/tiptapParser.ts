export function tiptapToHtml(content: any): string {
  if (!content) return "<p>Контент недоступен</p>";

  if (typeof content === "string") {
    try {
      content = JSON.parse(content);
    } catch {
      return `<p>${content}</p>`;
    }
  }

  if (!content.content || !Array.isArray(content.content)) {
    return "<p>Контент недоступен</p>";
  }

  let html = "";

  const parseNode = (node: any): string => {
    if (!node) return "";

    if (node.type === "text") {
      let text = node.text || "";

      if (node.marks) {
        node.marks.forEach((mark: any) => {
          switch (mark.type) {
            case "bold":
              text = `<strong>${text}</strong>`;
              break;
            case "italic":
              text = `<em>${text}</em>`;
              break;
            case "underline":
              text = `<u>${text}</u>`;
              break;
            case "strike":
              text = `<s>${text}</s>`;
              break;
            case "code":
              text = `<code>${text}</code>`;
              break;
            case "link":
              text = `<a href="${mark.attrs?.href || "#"}">${text}</a>`;
              break;
          }
        });
      }

      return text;
    }

    let innerContent = "";
    if (node.content && Array.isArray(node.content)) {
      innerContent = node.content.map(parseNode).join("");
    }

    switch (node.type) {
      case "paragraph":
        return `<p>${innerContent}</p>`;

      case "heading":
        const level = node.attrs?.level || 2;
        return `<h${level}>${innerContent}</h${level}>`;

      case "bulletList":
        return `<ul>${innerContent}</ul>`;

      case "orderedList":
        return `<ol>${innerContent}</ol>`;

      case "listItem":
        return `<li>${innerContent}</li>`;

      case "blockquote":
        return `<blockquote>${innerContent}</blockquote>`;

      case "codeBlock":
        return `<pre><code>${innerContent}</code></pre>`;

      case "hardBreak":
        return "<br/>";

      case "horizontalRule":
        return "<hr/>";

      case "image":
        const src = node.attrs?.src || "";
        const alt = node.attrs?.alt || "";
        return `<img src="${src}" alt="${alt}" />`;

      default:
        return innerContent;
    }
  };

  try {
    content.content.forEach((node: any) => {
      html += parseNode(node);
    });
  } catch (error) {
    console.error("Tiptap parse error:", error);
    return "<p>Ошибка отображения контента</p>";
  }

  return html || "<p>Контент пуст</p>";
}
