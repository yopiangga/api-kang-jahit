import { Meteor } from "meteor/meteor";

export function Order() {
  order = new Meteor.Collection("order");

  Router.route("/order", { where: "server" })
    .get(function () {
      var response = order.find().fetch();
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    })

    .post(function () {
      var response;
      if (
        this.request.body.id_konveksi === undefined ||
        this.request.body.id_penjahit === undefined ||
        this.request.body.status === undefined ||
        this.request.body.biaya === undefined ||
        this.request.body.nama_order === undefined ||
        this.request.body.deskripsi === undefined ||
        this.request.body.apply_order === undefined ||
        this.request.body.rating === undefined
      ) {
        response = {
          error: true,
          message: "invalid data",
        };
      } else {
        order.insert({
          id_konveksi: this.request.body.id_konveksi,
          id_penjahit: this.request.body.id_penjahit,
          status: this.request.body.status,
          biaya: this.request.body.biaya,
          order: this.request.body.nama_order,
          deskripsi: this.request.body.deskripsi,
          apply_order: this.request.body.apply_order,
          rating: this.request.body.rating
        });
        response = {
          error: false,
          message: "order added.",
        };
      }
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    });

  Router.route("/order/:id", { where: "server" })

    // GET /message/:id - returns specific records

    .get(function () {
      var response;
      if (this.params.id !== undefined) {
        var data = order.find({ _id: this.params.id }).fetch();
        if (data.length > 0) {
          response = data;
        } else {
          response = {
            error: true,
            message: "order not found.",
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
        var data = order.find({ _id: this.params.id }).fetch();
        if (data.length > 0) {
          if (
            order.update(
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
              message: "order information updated.",
            };
          } else {
            response = {
              error: true,
              message: "order information not updated.",
            };
          }
        } else {
          response = {
            error: true,
            message: "order not found.",
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
        var data = order.find({ _id: this.params.id }).fetch();
        if (data.length > 0) {
          if (order.remove(data[0]._id) === 1) {
            response = {
              error: false,
              message: "order deleted.",
            };
          } else {
            response = {
              error: true,
              message: "order not deleted.",
            };
          }
        } else {
          response = {
            error: true,
            message: "order not found.",
          };
        }
      }
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    });
}
