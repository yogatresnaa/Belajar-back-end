/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // memberikan forrign key kepada kolom song_id dan playlist_id
  pgm.addConstraint('playlist_song', 'unique_playlist_id_and_song_id', 'UNIQUE(playlist_id, song_id)');
  pgm.addConstraint('playlist_song', 'fk_playlist_song.playlist_id_playlists.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');
  pgm.addConstraint('playlist_song', 'fk_playlist_song.song_id_songs.id', 'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // menghapus constraint
  pgm.dropConstraint('playlist_song', 'fk_playlist_song.playlist_id_playlists.id');
  pgm.dropConstraint('playlist_song', 'fk_playlist_song.song_id_songs.id');
};
