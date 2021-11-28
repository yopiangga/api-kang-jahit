import { Meteor } from "meteor/meteor";

export function User() {
  user = new Meteor.Collection("user");

  Router.route("/user", { where: "server" })
    .get(function () {
      var response = user.find().fetch();
      
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    })

    .post(function () {
      var response;
      if (
        this.request.body.uid === undefined ||
        this.request.body.alamat === undefined ||
        this.request.body.kota === undefined ||
        this.request.body.provinsi === undefined ||
        this.request.body.avatar === undefined ||
        this.request.body.gender === undefined ||
        this.request.body.no_telp === undefined ||
        this.request.body.rating === undefined ||
        this.request.body.saldo === undefined ||
        this.request.body.tgl_bergabung === undefined ||
        this.request.body.tgl_lahir === undefined ||
        this.request.body.email === undefined ||
        this.request.body.nama === undefined ||
        this.request.body.gps.latitude === undefined ||
        this.request.body.gps.longitude === undefined ||
        this.request.body.role === undefined ||
        this.request.body.konveksi.nama_konveksi === undefined ||
        this.request.body.konveksi.deskripsi === undefined ||
        this.request.body.konveksi.foto_konveksi === undefined
      ) {
        response = {
          error: true,
          message: "invalid data",
        };
      } else {
        user.insert({
          uid: this.request.body.uid,
          alamat: this.request.body.alamat,
          avatar: this.request.body.avatar,
          gender: this.request.body.gender,
          no_telp: this.request.body.no_telp,
          rating: this.request.body.rating,
          saldo: this.request.body.saldo,
          tgl_bergabung: this.request.body.tgl_bergabung,
          tgl_lahir: this.request.body.tgl_lahir,
          email: this.request.body.email,
          nama: this.request.body.nama,
          gps: {
            latitude: this.request.body.gps.latitude,
            longitude: this.request.body.gps.longitude,
          },
          role: this.request.body.role,
          konveksi: {
            nama_konveksi: this.request.body.konveksi.nama_konveksi,
            deskripsi: this.request.body.konveksi.deskripsi,
            foto_konveksi: this.request.body.konveksi.foto_konveksi,
          },
        });
        response = {
          error: false,
          message: "user added.",
        };
      }
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    });

  Router.route("/user/:id", { where: "server" })

    // GET /message/:id - returns specific records

    .get(function () {
      var response;
      if (this.params.id !== undefined) {
        var data = user.find({ uid: this.params.id }).fetch();
        if (data.length > 0) {
          response = data;
        } else {
          response = {
            error: true,
            message: "user not found.",
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
        var data = user.find({ uid: this.params.id }).fetch();
        if (data.length > 0) {
          if (
            user.update(
              { _id: data[0]._id },
              {
                $set: {
                  uid: this.request.body.uid,
                  alamat: this.request.body.alamat,
                  avatar: this.request.body.avatar,
                  gender: this.request.body.gender,
                  no_telp: this.request.body.no_telp,
                  rating: this.request.body.rating,
                  saldo: this.request.body.saldo,
                  tgl_bergabung: this.request.body.tgl_bergabung,
                  tgl_lahir: this.request.body.tgl_lahir,
                  email: this.request.body.email,
                  nama: this.request.body.nama,
                  gps: {
                    latitude: this.request.body.gps.latitude,
                    longitude: this.request.body.gps.longitude,
                  },
                  role: this.request.body.role,
                  konveksi: {
                    nama_konveksi: this.request.body.konveksi.nama_konveksi,
                    deskripsi: this.request.body.konveksi.deskripsi,
                    foto_konveksi: this.request.body.konveksi.foto_konveksi,
                  },
                },
              }
            ) === 1
          ) {
            response = {
              error: false,
              message: "user information updated.",
            };
          } else {
            response = {
              error: true,
              message: "user information not updated.",
            };
          }
        } else {
          response = {
            error: true,
            message: "user not found.",
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
        var data = user.find({ _id: this.params.id }).fetch();
        if (data.length > 0) {
          if (user.remove(data[0]._id) === 1) {
            response = {
              error: false,
              message: "user deleted.",
            };
          } else {
            response = {
              error: true,
              message: "user not deleted.",
            };
          }
        } else {
          response = {
            error: true,
            message: "user not found.",
          };
        }
      }
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    });
}
