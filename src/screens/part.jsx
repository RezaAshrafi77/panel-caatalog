import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";

import { Navbar, Button, Loading, Tab, Image, Input } from "../components";
import {
  MdAdd,
  MdChevronLeft,
  MdDelete,
  MdPlusOne,
  MdRemove,
} from "react-icons/md";
import { baseUrl } from "../config";
import { TbTrash } from "react-icons/tb";

export const Part = ({ events, data }) => {
  const {
    isSuperAdmin,
    uploadFileID,
    uploadLoading,
    categories,
    part,
    isEditPage,
    templateLoading,
    template,
  } = data;
  const {
    changeRoute,
    changeActivePart,
    adminPartCreate,
    customerPartCreate,
    adminPartUpdate,
    customerPartUpdate,
    setDialog,
    uploadFile,
    adminDeletePart,
    customerDeletePart,
    refreshTemplate,
  } = events;

  const [render, setRender] = useState(null);
  const [selectedCats, setSelectedCats] = useState(
    part?.categoryIds?.length ? part?.categoryIds : []
  );
  const [file, setFile] = useState(null);
  const [fileIds, setFileIds] = useState(
    part?.fileIds?.length ? [...part?.fileIds?.map((file) => file?._id)] : []
  );
  const [categoryIds, setCategoryIds] = useState(
    part?.categoryIds?.length
      ? [...part?.categoryIds?.map((cat) => cat?._id)]
      : []
  );
  const [specifications, setSpecifications] = useState(
    part?.specifications || [
      {
        tag: "",
        key: "",
        value: "",
      },
    ]
  );
  const [catsTextInputValue, setCatsTextInputValue] = useState("");

  const submitForm = () => {
    if (isSuperAdmin) {
      if (isEditPage) {
        adminPartUpdate(
          {
            templateId: template?._id,
            partId: part?._id,
            title: part?.title,
            text: part?.text,
            fileIds,
            categoryIds,
            position: part?.position,
            ord: part?.ord,
            pid: part?.pid,
            link: part?.link,
            specifications,
          },
          () => {
            refreshTemplate();
            changeRoute("editTemplate");
          }
        );
      } else {
        adminPartCreate(
          {
            templateId: template?._id,
            partId: part?._id,
            title: part?.title,
            text: part?.text,
            fileIds,
            categoryIds,
            position: part?.position,
            ord: part?.ord,
            pid: part?.pid,
            link: part?.link,
            specifications,
          },
          () => {
            refreshTemplate();
            changeRoute("editTemplate");
          }
        );
      }
    } else {
      if (isEditPage) {
        customerPartUpdate(
          {
            templateId: template?._id,
            partId: part?._id,
            title: part?.title,
            text: part["text"],
            fileIds,
            categoryIds,
            position: part?.position,
            ord: part?.ord,
            pid: part?.pid,
            link: part?.link,
            specifications,
          },
          () => {
            refreshTemplate();
            changeRoute("editTemplate");
          }
        );
      } else {
        customerPartCreate(
          {
            templateId: template?._id,
            partId: part?._id,
            title: part?.title,
            text: part["text"],
            fileIds,
            categoryIds,
            position: part?.position,
            ord: part?.ord,
            pid: part?.pid,
            link: part?.link,
            specifications,
          },
          () => {
            refreshTemplate();
            changeRoute("editTemplate");
          }
        );
      }
    }
  };

  const deleteHandler = () => {
    if (isSuperAdmin) {
      adminDeletePart(
        {
          partId: part?._id,
          templateId: template?._id,
        },
        () => {
          refreshTemplate();
          changeRoute("editTemplate");
        }
      );
    } else {
      customerDeletePart(
        {
          partId: part?._id,
          templateId: template?._id,
        },
        () => {
          refreshTemplate();
          changeRoute("editTemplate");
        }
      );
    }
  };

  useEffect(() => {
    if (uploadFileID) {
      setFileIds([...fileIds, uploadFileID]);
    }
  }, [uploadFileID]);

  useEffect(() => {
    if (file) {
      uploadFile(file);
    }
  }, [file]);

  console.log(specifications);
  return (
    <div className="flex flex-col flex-1 max-w-full max-h-full h-full overflow-y-scroll pb-32">
      <Navbar
        classNames="text-white min-h-[54px] !bg-gray-900"
        leading={<strong>{part ? part?.title : null}</strong>}
        actions={[
          isEditPage ? (
            <Button
              icon={<TbTrash size={"1.75rem"} />}
              events={{
                onSubmit: () =>
                  setDialog({
                    title: "محصول حذف شود؟",
                    confirmTitle: "بله",
                    cancelTitle: "فعلا نه",
                    confirm: () => {
                      deleteHandler();
                    },
                  }),
              }}
              className="text-primary cursor-pointer"
            />
          ) : null,
          <Button
            icon={<MdChevronLeft size={"2.5rem"} />}
            events={{ onSubmit: () => changeRoute("editTemplate") }}
            className="text-white cursor-pointer"
          />,
        ]}
      />
      <div className="flex-1 flex flex-col py-8 px-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-4 w-full">
            <strong className="text-base font-medium text-gray-300">
              {"عکس‌های انتخاب شده"}
            </strong>
            <span className="flex-1 h-0.5 bg-gray-700"></span>
          </div>
          <ul className="flex gap-4 overflow-y-scroll mt-6 pb-4 pl-4 no-scrollbar">
            <Input
              key={"upload-file"}
              type="uploadFile"
              name="fileId"
              classNames="bg-opacity-20 min-w-[30vw] h-[30vw] md:min-w-[16vw] md:h-[12vw] md:!max-h-[200px] rounded-md"
              events={{
                onChange: (file) => setFile(file),
              }}
            />
            {fileIds?.map((file, index) => (
              <div className="relative group" key={"files-" + index}>
                <Image
                  key={"product-images-" + index}
                  src={baseUrl + "/files/" + file}
                  classNames="object-contained min-w-[30vw] h-[30vw] md:min-w-[16vw] md:h-[12vw] md:!max-h-[200px] bg-black rounded-md"
                  events={{ onClick: () => {} }}
                />
                <Button
                  icon={<TbTrash size={"1.5rem"} />}
                  events={{
                    onSubmit: () =>
                      setDialog({
                        title: "عکس حذف شود؟",
                        confirmTitle: "بله",
                        cancelTitle: "فعلا نه",
                        confirm: () => {
                          setFileIds(
                            fileIds?.filter((filee) => filee !== file)
                          );
                        },
                      }),
                  }}
                  className="transition-all rounded-md absolute left-3 bottom-3 bg-red-700 bg-opacity-80 backdrop-filter backdrop-blur-md text-white cursor-pointer group-hover:opacity-100 opacity-0 p-1"
                />
              </div>
            ))}
          </ul>
        </div>
        <form
          className="flex flex-col my-10 gap-8 max-w-[600px] w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="text"
            name="title"
            value={part?.title}
            events={{
              onChange: (name, value) =>
                changeActivePart({ ...part, ["title"]: value }),
            }}
            classNames="text-white !w-full !bg-transparent !px-4 !text-sm"
            placeholder="عنوان محصول را وارد کنید ..."
            label="عنوان"
            containerClassNames="!bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
            labelClassNames="text-gray-200 mb-1 text-xs"
          />
          <Input
            type="text"
            name="text"
            value={part?.text}
            events={{
              onChange: (name, value) =>
                changeActivePart({ ...part, ["text"]: value }),
            }}
            classNames="text-white !w-full !bg-transparent !px-4 !text-sm placeholder:text-sm placeholder:text-gray-400"
            placeholder="متن مورد نظر را بنویسید ..."
            label="توضیحات"
            containerClassNames="!bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
            labelClassNames="text-gray-200 mb-1 text-xs"
          />
          <Input
            type="multiSelect"
            name="categories"
            textInputValue={catsTextInputValue}
            placeholder="دسته بندی محصول ..."
            events={{
              setTextInputValue: (val) => setCatsTextInputValue(val),
            }}
            tagsRender={selectedCats?.map((cat, index) => (
              <Button
                key={"selected-cats-" + index}
                title={cat?.name}
                classNames="!w-fit bg-yellow-400 px-2 bg-opacity-10 !text-xs !gap-1.5"
                icon={<MdRemove size="1rem" color="white" />}
                events={{
                  onSubmit: () => {
                    setSelectedCats(
                      selectedCats?.filter((sCat) => sCat?.name !== cat?.name)
                    );
                    setCategoryIds(
                      categoryIds?.filter((id) => id !== cat?._id)
                    );
                  },
                }}
              />
            ))}
            optionsRender={
              <div className="flex flex-col w-full max-h-[150px] overflow-y-scroll">
                {categories
                  ?.filter((option) =>
                    option?.name?.includes(catsTextInputValue)
                  )
                  ?.map((option, index) => (
                    <div
                      key={"option-" + index}
                      className={`${
                        selectedCats?.find(
                          (item) => item?.name === option?.name
                        )
                          ? "border-r-4 border-r-green-600"
                          : ""
                      } py-1.5 cursor-pointer w-full border-gray-600 border-b select-none`}
                      onClick={() => {
                        if (
                          selectedCats?.find(
                            (item) => item?.name === option?.name
                          )
                        ) {
                          setSelectedCats(
                            selectedCats?.filter(
                              (cat) => cat?.name !== option?.name
                            )
                          );
                          setCategoryIds(
                            categoryIds?.filter((id) => id !== option?._id)
                          );
                        } else {
                          setSelectedCats([...selectedCats, option]);
                          setCategoryIds([...categoryIds, option?._id]);
                        }
                      }}
                    >
                      <div className="w-full items-center flex">
                        <div className="mx-2 leading-6 text-sm">
                          {option?.name}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            }
          />
          <strong className="mt-4 text-sm font-bold text-yellow-400">
            مشخصات
          </strong>
          <div className="flex flex-col gap-6">
            {specifications?.map((spec, index) => (
              <div className="flex gap-4" key={"tag" + index}>
                <Input
                  type="text"
                  name="tag"
                  value={spec?.tag}
                  events={{
                    onChange: (name, value) => {
                      setRender(value);
                      let array = specifications;
                      let obj = spec;
                      obj = { ...obj, tag: value };
                      array[index] = obj;
                      setSpecifications(array);
                    },
                  }}
                  classNames="text-white !w-full !bg-transparent !px-4 !text-sm"
                  placeholder="عنوان تگ را وارد کنید ..."
                  label="تگ"
                  containerClassNames="!bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
                  labelClassNames="text-gray-200 mb-1 text-xs"
                />
                <Input
                  type="text"
                  name="key"
                  value={spec?.key}
                  events={{
                    onChange: (name, value) => {
                      setRender(value);
                      let array = specifications;
                      let obj = spec;
                      obj = { ...obj, key: value };
                      array[index] = obj;
                      setSpecifications(array);
                    },
                  }}
                  classNames="text-white !w-full !bg-transparent !px-4 !text-sm"
                  placeholder="نام ویژگی را وارد کنید ..."
                  label="نام ویژگی"
                  containerClassNames="!bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
                  labelClassNames="text-gray-200 mb-1 text-xs"
                />
                <Input
                  type="text"
                  name="value"
                  value={spec?.value}
                  events={{
                    onChange: (name, value) => {
                      setRender(value);
                      let array = specifications;
                      let obj = spec;
                      obj = { ...obj, value: value };
                      array[index] = obj;
                      setSpecifications(array);
                    },
                  }}
                  classNames="text-white !w-full !bg-transparent !px-4 !text-sm"
                  placeholder="مقدار ویژگی را وارد کنید ..."
                  label="مقدار ویژگی"
                  containerClassNames="!bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
                  labelClassNames="text-gray-200 mb-1 text-xs"
                />
                <MdDelete
                  size="5rem"
                  color="red"
                  onClick={() => {
                    setRender(Math.random());
                    let array = specifications;
                    array.splice(index, 1);
                    setSpecifications(array);
                  }}
                />
              </div>
            ))}
          </div>

          <Button
            title="افزودن ویژگی جدید"
            classNames="!w-fit px-4 text-xs !max-h-[40px] bg-yellow-600"
            events={{
              onSubmit: () =>
                setSpecifications([
                  ...specifications,
                  {
                    tag: "",
                    key: "",
                    value: "",
                  },
                ]),
            }}
          />
          <Button
            classNames="!w-1/2 mt-4 text-white !bg-primary !rounded-full md:!max-h-[45px] text-sm"
            type="contained"
            primary="primary"
            loading={templateLoading}
            title="ارسال"
            events={{
              onSubmit: (e) => {
                submitForm();
              },
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Part;
