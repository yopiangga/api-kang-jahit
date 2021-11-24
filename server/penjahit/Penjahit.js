import { Meteor } from "meteor/meteor";

export function Penjahit() {
  penjahit = new Meteor.Collection("penjahit");

  Router.route("/konveksi", { where: "server" })
    .get(function () {
      var response = konveksi.find().fetch();
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    })

    .post(function () {
      var response;
      if (
        this.request.body.email === undefined ||
        this.request.body.deskripsi === undefined ||
        this.request.body.alamat === undefined ||
        this.request.body.kota === undefined ||
        this.request.body.provinsi === undefined ||
        this.request.body.foto_konveksi === undefined ||
        this.request.body.pemilik === undefined ||
        this.request.body.avatar === undefined ||
        this.request.body.gender === undefined ||
        this.request.body.no_telp === undefined ||
        this.request.body.saldo === undefined ||
        this.request.body.tgl_bergabung === undefined ||
        this.request.body.gps.latitude === undefined ||
        this.request.body.gps.longitude === undefined
      ) {
        response = {
          error: true,
          message: "invalid data",
        };
      } else {
        User.insert({
          email: this.request.body.email,
          deskripsi: this.request.body.deskripsi,
          alamat: this.request.body.alamat,
          kota: this.request.body.kota,
          provinsi: this.request.body.provinsi,
          foto_konveksi: this.request.body.foto_konveksi,
          pemilik: this.request.body.pemilik,
          avatar: this.request.body.avatar,
          gender: this.request.body.gender,
          no_telp: this.request.body.no_telp,
          saldo: this.request.body.saldo,
          tgl_bergabung: this.request.body.tgl_bergabung,
          gps: {
            latitude: this.request.body.gps.latitude,
            longitude: this.request.body.gps.longitude,
          },
        });
        response = {
          error: false,
          message: "Konveksi added.",
        };
      }
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    });

  Router.route("/konveksi/:id", { where: "server" })

    // GET /message/:id - returns specific records

    .get(function () {
      var response;
      if (this.params.id !== undefined) {
        var data = konveksi.find({ _id: this.params.id }).fetch();
        if (data.length > 0) {
          response = data;
        } else {
          response = {
            error: true,
            message: "Konveksi not found.",
          };
        }
      }
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    })

    // PUT /message/:id {message as put data}- update specific records.

    .put(function () {
      var response;
      if (this.params.id !== undefined) {
        var data = konveksi.find({ _id: this.params.id }).fetch();
        if (data.length > 0) {
          if (
            User.update(
              { _id: data[0]._id },
              {
                $set: {
                  email: this.request.body.email,
                  deskripsi: this.request.body.deskripsi,
                  alamat: this.request.body.alamat,
                  kota: this.request.body.kota,
                  provinsi: this.request.body.provinsi,
                  foto_konveksi: this.request.body.foto_konveksi,
                  pemilik: this.request.body.pemilik,
                  avatar: this.request.body.avatar,
                  gender: this.request.body.gender,
                  no_telp: this.request.body.no_telp,
                  saldo: this.request.body.saldo,
                  tgl_bergabung: this.request.body.tgl_bergabung,
                  gps: {
                    latitude: this.request.body.gps.latitude,
                    longitude: this.request.body.gps.longitude,
                  },
                },
              }
            ) === 1
          ) {
            response = {
              error: false,
              message: "Konveksi information updated.",
            };
          } else {
            response = {
              error: true,
              message: "Konveksi information not updated.",
            };
          }
        } else {
          response = {
            error: true,
            message: "Konveksi not found.",
          };
        }
      }
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    })

    // DELETE /message/:id delete specific record.

    .delete(function () {
      var response;
      if (this.params.id !== undefined) {
        var data = konveksi.find({ _id: this.params.id }).fetch();
        if (data.length > 0) {
          if (User.remove(data[0]._id) === 1) {
            response = {
              error: false,
              message: "Konveksi deleted.",
            };
          } else {
            response = {
              error: true,
              message: "Konveksi not deleted.",
            };
          }
        } else {
          response = {
            error: true,
            message: "Konveksi not found.",
          };
        }
      }
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    });
}
