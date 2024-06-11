import { useState, useEffect } from "react";

const useInput = (validationFn) => {
  const [data, setData] = useState("");
  const [error, setError] = useState();

  useEffect(() => {
    if (data) {
      //Nếu input có dữ liệu ta xác thực dữ liệu
      if (validationFn(data)) {
        //xác thực là true thì set không có lỗi
        setError();
      } else {
        setError(true);
      }
    } else {
      //Nếu input không có dữ liệu ta sẽ không cho hiển thị thông báo lỗi
      setError();
    }
  }, [data]);
  return { data, setData, error };
};

export default useInput;
