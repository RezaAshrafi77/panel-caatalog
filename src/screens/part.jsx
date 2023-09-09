import { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Navbar, Button, Loading, Tab, Image, Input } from "../components";
import { MdAdd, MdChevronLeft, MdPlusOne } from "react-icons/md";
import { dialog, part, template } from "../redux/actions";
import { baseUrl } from "../config";
import { TbTrash } from "react-icons/tb";

export const Part = ({
  template,
  part,
  updatePart,
  setDialog,
  type,
  events,
  templateLoading,
  partLoading,
}) => {
  const [formValues, setFormValues] = useState({
    title: part?.title,
    text: part?.text,
  });
  const [formLoading, setFormLoading] = useState(false);
  const submitForm = () => {
    updatePart({
      templateId: template?._id,
      partId: part?._id,
      title: part?.title,
      text: part["text"],
      fileIds: part?.fileIds?.map((file) => file?._id),
      categoryIds: part?.categoryIds?.map((cat) => cat?._id),
      position: part?.position,
      ord: part?.ord,
      pid: part?.pid,
      link: part?.link,
    });
  };

  return (
    <div className="flex flex-col flex-1 max-w-full max-h-full h-full overflow-y-scroll ">
      <Navbar
        classNames="text-white min-h-[54px] !bg-gray-900"
        leading={part ? <strong>{part?.title}</strong> : null}
        actions={[
          <Button
            icon={<MdChevronLeft size={"2.5rem"} />}
            events={{ onSubmit: () => events["changeRoute"]("editTemplate") }}
            className="text-white cursor-pointer"
          />,
        ]}
      />
      <div className="flex-1 flex flex-col py-8 px-6">
        <div className="flex items-center gap-4 w-full">
          <strong className="text-base font-medium text-gray-300">
            {"عکس‌های انتخاب شده"}
          </strong>
          <span className="flex-1 h-0.5 bg-gray-700"></span>
          <Button
            icon={<MdAdd size={"2rem"} />}
            classNames="!text-green-400 cursor-pointer"
          />
        </div>
        <ul className="flex gap-4 overflow-y-scroll mt-6">
          {part?.fileIds?.map((file, index) => (
            <div className="relative group" key={"files-" + index}>
              <Image
                key={"product-images-" + index}
                src={baseUrl + "/files/" + file?._id}
                classNames="object-contained md:min-w-[16vw] md:h-[12vw] md:!max-h-[200px] bg-black rounded-md"
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
                      confirm: () =>
                        events["changeActivePart"]({
                          ...part,
                          fileIds: part?.fileIds?.filter(
                            (filee) => filee?._id !== file?._id
                          ),
                        }),
                    }),
                }}
                className="transition-all rounded-md absolute left-3 bottom-3 bg-red-700 bg-opacity-80 backdrop-filter backdrop-blur-md text-white cursor-pointer group-hover:opacity-100 opacity-0 p-1"
              />
            </div>
          ))}
        </ul>
        <form
          className="flex flex-col my-10 gap-8 max-w-[400px] w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="text"
            name="نام محصول"
            value={part?.title}
            events={{
              onChange: (name, value) =>
                events["changeActivePart"]({ ...part, ["title"]: value }),
            }}
            classNames="text-white !w-full !bg-transparent !px-4 !text-sm placeholder:text-sm placeholder:text-gray-400"
            placeholder="dfd"
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
                events["changeActivePart"]({ ...part, ["text"]: value }),
            }}
            classNames="text-white !w-full !bg-transparent !px-4 !text-sm placeholder:text-sm placeholder:text-gray-400"
            placeholder="متن مورد نظر را بنویسید ..."
            label="توضیحات"
            containerClassNames="!bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
            labelClassNames="text-gray-200 mb-1 text-xs"
          />
          <Button
            classNames="!w-1/2 mt-4 text-white !bg-primary !rounded-full md:!max-h-[45px] text-sm"
            type="contained"
            primary="primary"
            loading={templateLoading || formLoading || partLoading}
            title="ارسال"
            events={{
              onSubmit: (e) => {
                setFormLoading(true);
                submitForm();
                setTimeout(() => {
                  setFormLoading(false);
                }, 1500);
              },
            }}
          />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  template: state.template.template,
  templateLoading: state.template.loading,
  partLoading: state.part.loading,
});

const mapDispatchToProps = {
  updatePart: part.update,
  setDialog: dialog.set,
};

export default connect(mapStateToProps, mapDispatchToProps)(Part);
