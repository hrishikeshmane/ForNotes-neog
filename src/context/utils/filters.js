const applyFilter = (data, filterState) => {
  const _reduced = (f, g) => (arg) => g(f(arg));
  const pipe = (...fns) => fns.reduce(_reduced);

  const sortNotesByDate = (data) => {
    if (filterState.sortByDate === "asc") {
      return [...data].sort((note1, note2) => note1.date - note2.date);
    } else {
      return [...data].sort((note1, note2) => note2.date - note1.date);
    }
  };

  const filterByColors = (data) => {
    return data.filter((note) => {
      if (filterState.colors.includes(note.noteColor)) return true;
      else return false;
    });
  };

  const filterByTags = (data) => {
    if (filterState.tags.length > 0) {
      return data.filter((note) =>
        note.tags.some((tag) => filterState.tags.includes(tag))
      );
    } else return data;
  };

  const filteredNotes = pipe(
    sortNotesByDate,
    filterByColors,
    filterByTags
  )(data);

  return filteredNotes;
};

export { applyFilter };
