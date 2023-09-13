export const adminsTemplatesTheads = ["", "ID", "نام", " شروع", " پایان"];
export const adminsUsersTheads = ["", "نام کاربری", "ID"];
export const templateFormDataBuilder = (template, type) => {
  const today = new Date();
  today.setMonth(today.getMonth() + 6);
  const sixMonthsLater = today;
  if (type === "create") {
    return {
      name: template?.name || "",
      backgroundFileId: template?.backgroundFileId?._id || "",
      parts: template?.parts?.length ? template?.parts : [],
      expiredAt: template?.expiredAt || sixMonthsLater,
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
    };
  } else {
    return {
      templateId: template?._id || "",
      name: template?.name || "",
      backgroundFileId: template?.backgroundFileId?._id || "",
      expiredAt: template?.expiredAt || sixMonthsLater,
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
  }
};
