export const adminsTemplatesTheads = ["", "ID", "نام", " شروع", " پایان"];
export const adminsUsersTheads = ["", "نام کاربری", "ID"];
export const templateFormDataBuilder = (template) => {
  return {
    ord: template?.ord || undefined,
    pid: template?.pid || "",
    name: template?.name || "",
    backgroundFileId: template?.backgroundFileId || "",
    backgroundColor: template?.backgroundColor || "",
    parts: template?.parts?.length ? template?.parts : [],
    expiredAt: template?.expiredAt || new Date(2 / 3 / 2024),
    about: {
      title: template?.about?.title || "",
      description: template?.about?.description || "",
      logoFileId: template?.about?.logoFileId || "",
      address: template?.about?.address || "",
      location: template?.about?.location || "",
      phone: template?.about?.phone || "",
      cellphone: template?.about?.cellphone || "",
      email: template?.about?.email || "",
      telegram: template?.about?.telegram || "",
      instagram: template?.about?.instagram || "",
      twitter: template?.about?.twitter || "",
    },
    ui: {
      buttonOfVitrine: template?.ui?.buttonOfVitrine || "",
      buttonOfAbout: template?.ui?.buttonOfAbout || "",
      textOfPartDesc: template?.ui?.textOfPartDesc || "",
    },
    ownerId: template?.ownerId || "",
  };
};
