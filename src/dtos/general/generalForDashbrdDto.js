export class GeneralForDashbrdDTO {
  constructor({
    _id,
    bannerInfo,
    bannerPic,
    aboutPic,
    aboutInfo,
    visitors,
    subscribers,
    bannerCards,
    createdAt,
    updatedAt}
  ) {
    this.id = _id;
    this.bannerPic = bannerPic;
    this.bannerInfo = bannerInfo;
    this.aboutPic = aboutPic;
    this.aboutInfo = aboutInfo;
    this.visitors = visitors;
    this.subscribers = subscribers;
    this.bannerCards = bannerCards;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
