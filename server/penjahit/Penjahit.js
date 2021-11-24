import { Meteor } from "meteor/meteor";

export function Penjahit() {
  penjahit = new Meteor.Collection("penjahit");

  Router.route("/penjahit", { where: "server" })
    .get(function () {
      var response = penjahit.find().fetch();
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    })

    .post(function () {
      var response;
      if (
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
        this.request.body.gps.longitude === undefined
      ) {
        response = {
          error: true,
          message: "invalid data",
        };
      } else {
        penjahit.insert({
          alamat: this.request.body.alamat,
          kota: this.request.body.kota,
          provinsi: this.request.body.provinsi,
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
        });
        response = {
          error: false,
          message: "penjahit added.",
        };
      }
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    });

  Router.route("/penjahit/:id", { where: "server" })

    // GET /message/:id - returns specific records

    .get(function () {
      var response;
      if (this.params.id !== undefined) {
        var data = penjahit.find({ _id: this.params.id }).fetch();
        if (data.length > 0) {
          response = data;
        } else {
          response = {
            error: true,
            message: "penjahit not found.",
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
        var data = penjahit.find({ _id: this.params.id }).fetch();
        if (data.length > 0) {
          if (
            penjahit.update(
              { _id: data[0]._id },
              {
                $set: {
                  alamat: this.request.body.alamat,
                  kota: this.request.body.kota,
                  provinsi: this.request.body.provinsi,
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
                },
              }
            ) === 1
          ) {
            response = {
              error: false,
              message: "penjahit information updated.",
            };
          } else {
            response = {
              error: true,
              message: "penjahit information not updated.",
            };
          }
        } else {
          response = {
            error: true,
            message: "penjahit not found.",
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
        var data = penjahit.find({ _id: this.params.id }).fetch();
        if (data.length > 0) {
          if (penjahit.remove(data[0]._id) === 1) {
            response = {
              error: false,
              message: "penjahit deleted.",
            };
          } else {
            response = {
              error: true,
              message: "penjahit not deleted.",
            };
          }
        } else {
          response = {
            error: true,
            message: "penjahit not found.",
          };
        }
      }
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    });
}
