import { Meteor } from "meteor/meteor";

export function Topup() {
  topup = new Meteor.Collection("topup");

  Router.route("/topup", { where: "server" })
    .get(function () {
      var response = topup.find().fetch();
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    })

    .post(function () {
      var response;
      if (
        this.request.body.id_konveksi === undefined ||
        this.request.body.status === undefined ||
        this.request.body.jumlah_topup === undefined
      ) {
        response = {
          error: true,
          message: "invalid data",
        };
      } else {
        topup.insert({
          id_konveksi: this.request.body.id_konveksi,
          status: this.request.body.status,
          jumlah_topup: this.request.body.jumlah_topup,
        });
        response = {
          error: false,
          message: "topup added.",
        };
      }
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    });

  Router.route("/topup/:id", { where: "server" })

    // GET /message/:id - returns specific records

    .get(function () {
      var response;
      if (this.params.id !== undefined) {
        var data = topup.find({ _id: this.params.id }).fetch();
        if (data.length > 0) {
          response = data;
        } else {
          response = {
            error: true,
            message: "topup not found.",
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
        var data = topup.find({ _id: this.params.id }).fetch();
        if (data.length > 0) {
          if (
            topup.update(
              { _id: data[0]._id },
              {
                $set: {
                  id_konveksi: this.request.body.id_konveksi,
          status: this.request.body.status,
          jumlah_topup: this.request.body.jumlah_topup,
                },
              }
            ) === 1
          ) {
            response = {
              error: false,
              message: "topup information updated.",
            };
          } else {
            response = {
              error: true,
              message: "topup information not updated.",
            };
          }
        } else {
          response = {
            error: true,
            message: "topup not found.",
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
        var data = topup.find({ _id: this.params.id }).fetch();
        if (data.length > 0) {
          if (topup.remove(data[0]._id) === 1) {
            response = {
              error: false,
              message: "topup deleted.",
            };
          } else {
            response = {
              error: true,
              message: "topup not deleted.",
            };
          }
        } else {
          response = {
            error: true,
            message: "topup not found.",
          };
        }
      }
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    });
}
