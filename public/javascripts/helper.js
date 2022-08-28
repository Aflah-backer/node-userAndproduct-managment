const id = document.getElementsByClassName("id");

for (const item of id) {
  const inc = parseInt(item.textContent);
  item.textContent = inc + 1;
}
