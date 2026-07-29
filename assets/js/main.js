(() => {
  const openEntryFromHash = () => {
    const id = window.location.hash.slice(1);
    const entry = id ? document.getElementById(id) : null;

    if (entry?.matches('.entry')) entry.open = true;
  };

  window.addEventListener('hashchange', openEntryFromHash);
  openEntryFromHash();
})();
