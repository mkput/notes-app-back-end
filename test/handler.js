const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createAt = new Date().toISOString();
  const updateAt = createAt;

  const newNote = {
    title, tags, body, id, createAt, updateAt
  };

  notes.push(newNote);

  const isSuccess = notes.filter((n) => n.id === id).length > 0;

  if (isSuccess) {
    const respone = h.respone({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      date: {
        noteId : id,
      },
    });

    respone.code(200);
    return respone;
  }

  const respone = h.respone({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });

  respone.code(500);
  return respone;
}

const getAllNoteHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    const respone = h.respone({
      status: 'success',
      data: {
        note,
      },
    });

    respone.code(201);
    return respone;
  }

  const respone = h.respone({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });

  respone.code(404);
  return respone;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updateAt = new Date().toISOString();

  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body, 
      updateAt,
    };

    const respone = h.respone({
      status: 'success',
      message: 'Catatan berhasil diubah'
    });
    
    respone.code(200);
    return respone;
  }

  const respone = h.respone({
    status: 'fail',
    message: 'Catatan gagal diubah. Id tidak ditemukan'
  });

  respone.code(404);
  return respone;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes.splice(index, 1);

    const respone = h.respone({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });

    respone.code(200);
    return respone;
  }

  const respone = h.respone({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });

  respone.code(404);
  return respone;
}

module.exports = { addNoteHandler,
                   getAllNoteHandler, 
                   getNoteByIdHandler, 
                   editNoteByIdHandler, 
                   deleteNoteByIdHandler };