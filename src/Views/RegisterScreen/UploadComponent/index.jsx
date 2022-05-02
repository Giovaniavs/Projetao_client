import { Form, Button, Upload, Modal } from "antd";

import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { storage } from "../../../firebase";
import { InvisbleInput, UploadWrapper } from "../styles";

export default function UploadComponent({
  limiteUpload = 1,
  setImagesList,
  imageName,
  buttonTitle = "Enviar",
}) {
  const [fileList, setFileList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [requestDone, setRequestDone] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [preview, setPreview] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
  });

  const [message, setMessage] = useState({});
  const storageRef = storage.ref();

  const beforeUpload = (file) => {
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      console.error(`${file.name} is not a valid image type`, 2);
      setMessage({ error: `${file.name} is not a valid image type` });
      return null;
    }
    return false;
  };

  const handleChange = ({ fileList }) => {
    setRequestDone(false);
    const filteredFileList = fileList.filter((file) => file.status !== "error");
    setCanSubmit(!fileList.some((item) => item.status !== "done"));
    setFileList(filteredFileList);
  };

  const onRemove = async (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);

    setFileList(newFileList);
    setImagesList((prev) =>
      prev.filter((currFile) => currFile.uid !== file.uid)
    );
  };

  const handleFinish = async () => {
    try {
      setSubmitting(true);
      setRequestDone(false);

      await Promise.all(
        fileList.map(async (file) => {
          setSubmitting(true);
          if (file.status === "done") return;

          setFileList((prev) => {
            return prev.map((curFile) => {
              const isCurrentFile = curFile.uid === file.uid;
              if (isCurrentFile) return { ...file, status: "uploading" };
              return curFile;
            });
          });

          const fileName = `uploads/images/${Date.now()}-${imageName}`;
          const fileRef = storageRef.child(fileName);
          try {
            const designFile = await fileRef.put(file.originFileObj);
            const downloadUrl = await designFile.ref.getDownloadURL();
            const item = {
              url: downloadUrl,
              path: fileName,
              name: fileName,
              uid: file.uid,
              id: file.uid,
            };

            setFileList((prev) => {
              return prev.map((curFile) => {
                const isCurrentFile = curFile.uid === file.uid;
                if (isCurrentFile) return { ...file, status: "done" };
                return curFile;
              });
            });

            setImagesList((prev) => [...prev, item]); // should be an array
          } catch (e) {
            console.log(e);
          }
        })
      );

      // setFileList([]);
      setMessage({ success: `Images added successfully.` });
      console.log(`Images added successfully.`, 2);
    } catch (err) {
      console.log(err);
      setMessage({ error: `Error adding images.` });
      console.error(`Error adding images.`, 2);
    } finally {
      setFileList((prev) => {
        const shouldSubmit = !prev.some((item) => item.status !== "done");
        setCanSubmit(shouldSubmit);
        return prev;
      });

      setRequestDone(true);
      setSubmitting(false);
    }
  };

  const handleCancel = () =>
    setPreview((prev) => ({ ...prev, previewVisible: false }));

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreview({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <UploadWrapper>
      <div className="uploadContainer">
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={beforeUpload}
          onPreview={handlePreview}
          onChange={handleChange}
          onRemove={onRemove}
          handleFinish={handleFinish}
          multiple={fileList.length === 1 ? false : true}
          maxCount={limiteUpload}
          accept=".jpg, .jpeg, .png"
        >
          {fileList.length >= limiteUpload ? null : uploadButton}
        </Upload>
      </div>

      <Modal
        visible={preview.previewVisible}
        title={preview.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{ width: "100%" }}
          src={preview.previewImage}
        />
      </Modal>
      {fileList.length >= limiteUpload && requestDone ? null : (
        <Form.Item>
          <InvisbleInput
            type="text"
            required
            value={canSubmit || ""}
            onChange={() => {}}
          />
          <Button
            shape="round"
            htmlType="button"
            type="button"
            onClick={handleFinish}
          >
            {submitting ? "Enviando" : buttonTitle}
          </Button>
        </Form.Item>
      )}
    </UploadWrapper>
  );
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
