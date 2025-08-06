const fs = require("fs");

const files = process.argv.slice(2);

files.forEach((file) => {
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  const header = lines.slice(0, 2);
  const bodyLines = lines
    .slice(2)
    .filter((line) => line.trim() !== "</ListView>" && line.trim() !== "");
  const mapping = {};
  bodyLines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("<fullName>")) mapping.fullName = line;
    else if (trimmed.startsWith("<label>")) mapping.label = line;
    else if (trimmed.startsWith("<filterScope>")) mapping.filterScope = line;
    else if (trimmed.startsWith("<filters")) mapping.filters = line;
    else if (trimmed.startsWith("<columns>")) mapping.columns = line;
    else if (trimmed.startsWith("<sortColumn>")) mapping.sortColumn = line;
    else if (trimmed.startsWith("<sortOrder>")) mapping.sortOrder = line;
  });
  const newLines = [
    header[0],
    header[1],
    mapping.fullName,
    mapping.columns,
    mapping.filterScope,
    mapping.filters,
    mapping.label,
    mapping.sortColumn,
    mapping.sortOrder,
    "</ListView>"
  ];
  fs.writeFileSync(file, newLines.join("\n"));
});
