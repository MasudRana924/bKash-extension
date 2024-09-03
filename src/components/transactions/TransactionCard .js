import React from "react";
import { FiCopy } from "react-icons/fi";
import { formatDate } from "../../utilities/helper";
import avatar from "../../assets/avatar.png";
const TransactionCard = ({ item }) => {
  return (
    <div className="card col-span-12 md:col-span-3 gap-4 lg:col-span-4 2xl:col-span-3 ">
      <div className="text-start flex justify-between gap-5 border p-2">
        <div className="flex">
          <div>
            <img
              src={avatar}
              alt=""
              className="h-8 w-8  mt-6 border rounded-full  "
            />
          </div>
          <div>
            <p
              className=" text-gray-500 font-medium ml-2"
              style={{ fontSize: 10 }}
            >
              Make Payment
            </p>
            <p className="text-gray-500  ml-2">
              <span style={{ color: "#E2136E", fontSize: 10 }}>
                {item.debit_msisdn}
              </span>
            </p>
            <div className="flex gap-4">
              <p className="  ml-2 text-gray-500" style={{ fontSize: 10 }}>
                Trx ID : {item.trx_id}
              </p>
              <FiCopy className=" text-violet-500 " style={{ fontSize: 10 }} />
            </div>
            <p className="text-xs text-start ml-2 text-gray-500">
              reference : {item.transaction_reference}
            </p>
          </div>
        </div>
        <div>
          <p
            className="text-end text-green-500"
            style={{ fontSize: 10 }}
          >
            + <span>{item.amount}.00 TK</span>
          </p>
          <p className=" text-gray-500 text-end mt-1" style={{ fontSize: 10 }}>
            Charge  0.00 TK
          </p>
          <p className="mb-2 text-gray-500 mt-1" style={{ fontSize: 8 }}>
            {formatDate(item.created_at)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
