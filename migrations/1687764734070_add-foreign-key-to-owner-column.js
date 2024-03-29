/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // membuat user baru
  pgm.sql(
    "INSERT INTO users(id, username, password, fullname) VALUES('old_notes', 'old_notes', 'old_notes', 'old_notes')"
  );

  // mengubah nilai owner pada note yang owner bernilai NULL
  pgm.sql("UPDATE notes SET owner = 'old_notes' WHERE owner IS NULL");

  // memberikan constraint key pada kolom owner terhadap kolom id dari tabel users
  pgm.addConstraint(
    'notes',
    'fk_notes.owner_users.id',
    'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  // menghapus contraint fk_notes.owner_users.id pada table notes
  pgm.dropConstraint('notes', 'fk_notes.owner_users.id');

  // mengubah nilai owner old_notes pada note menjadi NULL
  pgm.sql("UPDATE notes SET owner = NULL WHERE owner = 'old_notes");

  // menghapus user old_notes
  pgm.sql("DELETE FROM users WHERE id = 'old_notes");
};
