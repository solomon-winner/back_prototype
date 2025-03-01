export class GeneralDTO {
  constructor({_id,bannerTitle, bannerInfo, bannerPic, aboutPic, aboutInfo, bannerCards}) {
    this.id = _id;
    this.title = bannerTitle;
    this.bannerPic = bannerPic;
    this.bannerInfo = bannerInfo;
    this.aboutPic = aboutPic;
    this.aboutInfo = aboutInfo;
    this.bannerCards = bannerCards;
  }
}
