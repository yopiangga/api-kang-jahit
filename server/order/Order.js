import { Meteor } from "meteor/meteor";

export function Order() {
  order = new Meteor.Collection("order");

  Router.route("/count-all-order", { where: "server" })
    .get(function () {
      var response = order.find().count();
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    })

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
          nama_order: this.request.body.nama_order,
          deskripsi: this.request.body.deskripsi,
          kota: this.request.body.kota,
          gambar: this.request.body.gambar,
          batas_selesai: this.request.body.batas_selesai,
          gps: {
            latitude: this.request.body.gps.latitude,
            longitude: this.request.body.gps.longitude,
          },
          apply_order: this.request.body.apply_order,
          rating: this.request.body.rating,
        });
        response = {
          error: false,
          message: "order added.",
        };
      }
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    });

  Router.route("/order/konveksi/:uid", { where: "server" })

    // GET /message/:id - returns specific records

    .get(function () {
      var response;
      if (this.params.uid !== undefined) {
        var data = order.find({ id_konveksi: this.params.uid }).fetch();
        if (data.length > 0) {
          response = data;
        } else {
          response = {
            error: true,
            message: "order not found.2",
          };
        }
      }
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    });


  Router.route("/order/riwayat/:uid", { where: "server" })

    // GET /message/:id - returns specific records

    .get(function () {
      var response;
      if (this.params.uid !== undefined) {
        var data = order.find({ id_konveksi: this.params.uid, status: 4 }).fetch();
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
    });


  Router.route("/order/diambil/:uid", { where: "server" })

    // GET /message/:id - returns specific records

    .get(function () {
      var response;
      if (this.params.uid !== undefined) {
        var data = order.find({ apply_order: this.params.uid }).fetch();
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
    });


  Router.route("/order/konfirmasi-diambil/:uid", { where: "server" })

    // GET /message/:id - returns specific records

    .get(function () {
      var response;
      if (this.params.uid !== undefined) {
        var data = order.find({ id_konveksi: this.params.uid, status: 2 }).fetch();
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
    });

    Router.route("/order/penjahit/:uid", { where: "server" })

    // GET /message/:id - returns specific records

    .get(function () {
      var response;
      if (this.params.uid !== undefined) {
        var data = order.find({ id_penjahit: this.params.uid }).fetch();
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
    });



    Router.route("/order/penjahit/:uid/:status", { where: "server" })

    // GET /message/:id - returns specific records

    .get(function () {
      var response;
      if (this.params.uid !== undefined && this.params.status !== undefined) {
        var data = order.find({ id_penjahit: this.params.uid, status: parseInt(this.params.status) }).fetch();
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
    });



  Router.route("/order/:uid/:status", { where: "server" })

    // GET /message/:id - returns specific records

    .get(function () {
      var response;
      if (this.params.uid !== undefined && this.params.status !== undefined) {
        var data = order.find({ id_konveksi: this.params.uid, status: parseInt(this.params.status) }).fetch();
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
                  id_konveksi: this.request.body.id_konveksi,
                  id_penjahit: this.request.body.id_penjahit,
                  status: this.request.body.status,
                  biaya: this.request.body.biaya,
                  nama_order: this.request.body.nama_order,
                  deskripsi: this.request.body.deskripsi,

                  gambar: this.request.body.gambar,
                  batas_selesai: this.request.body.batas_selesai,
                  gps: {
                    latitude: this.request.body.gps.latitude,
                    longitude: this.request.body.gps.longitude,
                  },
                  apply_order: this.request.body.apply_order,
                  rating: this.request.body.rating,
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
