import Image from "next/image";
import React from "react";
import { SERVICES } from "@/const/leasur";

const Service = () => {
  return (
    <section
      id="service"
      className="relative flex flex-col items-center gap-10 px-0 py-20"
    >
      <div className="relative z-10 flex w-[64.375rem] flex-col gap-10 md:w-80">
        {/* Title Section */}
        <div className="flex flex-col gap-4 md:gap-4">
          <p className="font-helvetica text-base font-bold leading-4 text-[#2BA1DB]">
            ● Service
          </p>
          <div className="relative inline-flex items-start md:w-full">
            <div className="absolute left-0 top-2 h-2 w-[624.417px] bg-white md:top-[27px] md:h-2 md:w-[310px]"></div>
            <div className="absolute left-0 top-10 h-2 w-[624.417px] bg-white md:top-[69px] md:h-2 md:w-[310px]"></div>
            <h2 className="relative font-gothic text-[30px] font-normal leading-[40px] text-[rgba(0,0,0,0.85)] md:w-[337px] md:leading-[40px]">
              業務効率を爆上げする、リーソルの
              <span className="text-[40px]">7</span>
              つの機能
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="w-[61.813rem] font-gothic text-[20px] font-normal leading-[28px] text-[#333333] md:w-[339px]">
          リーソルは、あなたの文書作成業務を劇的に効率化する3つの具体的なステップ（機能）を提供します。
        </p>

        {/* Service Items */}
        <div className="flex flex-col gap-10">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              className="relative w-full rounded-[20px] bg-slate-100 p-10 md:w-80 md:p-10"
            >
              {/* Number Badge */}
              <div className="absolute right-4 top-4 md:hidden">
                <Image
                  src={`/assets/images/leasur/service_number_${service.number}.png`}
                  alt={`Number ${service.number}`}
                  width={160}
                  height={160}
                  className="object-contain"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col gap-10">
                {/* Title and Description */}
                {service.title.length > 0 && (
                  <div className="flex flex-col gap-[3px]">
                    {service.title.map((line, i) => (
                      <p
                        key={i}
                        className="font-gothic text-[24px] font-normal leading-8 tracking-[0.96px] text-[#333333]"
                      >
                        {line}
                      </p>
                    ))}
                    <p className="mt-[3px] font-gothic text-base font-normal leading-6 text-[#333333]">
                      {service.description}
                    </p>
                  </div>
                )}

                {/* Features Section */}
                {index === 0 ? (
                  /* Special layout for first service with two columns */
                  <div className="flex flex-col gap-10 md:gap-10">
                    {/* First Feature with Image */}
                    <div className="flex items-center gap-6 md:flex-col md:items-start md:gap-6">
                      <div className="h-[251.99px] w-[334px] flex-shrink-0 overflow-hidden rounded-[20px] md:h-auto md:w-full">
                        <Image
                          src={service.image}
                          alt={service.imageAlt}
                          width={334}
                          height={252}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-2 md:w-full">
                        <div className="inline-flex w-fit items-center gap-[10px] rounded-[2px] bg-[#2BA1DB] px-4 py-[2px]">
                          <p className="font-gothic text-[13px] font-normal leading-6 text-white">
                            {service.features?.[0]?.label}
                          </p>
                        </div>
                        <p className="w-[542px] font-gothic text-base font-normal leading-6 text-[#333333] md:w-full">
                          {service.features?.[0]?.description}
                        </p>
                      </div>
                    </div>

                    {/* Second Row with Image and Features */}
                    <div className="flex items-start gap-6 md:flex-col md:gap-6">
                      <div className="h-[188px] w-[334px] flex-shrink-0 rounded-[10px] bg-white shadow-[0px_0px_45px_0px_rgba(0,0,0,0.1)] md:h-[188px] md:w-full"></div>
                      <div className="flex flex-col gap-6 md:w-full">
                        {service.features?.slice(1).map((feature, i) => (
                          <div key={i} className="flex flex-col gap-2">
                            <div className="inline-flex w-fit items-center gap-[10px] rounded-[2px] bg-[#2BA1DB] px-4 py-[2px]">
                              <p className="font-gothic text-[13px] font-normal leading-6 text-white">
                                {feature.label}
                              </p>
                            </div>
                            <p className="w-[533px] font-gothic text-base font-normal leading-6 text-[#333333] md:w-full">
                              {feature.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard layout for other services */
                  <div className="flex items-center gap-6 md:flex-col md:items-start md:gap-6">
                    <div className="h-[188px] w-[334px] flex-shrink-0 rounded-[10px] bg-white shadow-[0px_0px_45px_0px_rgba(0,0,0,0.1)] md:w-full"></div>
                    <div className="flex flex-col gap-2 md:w-full">
                      {service.features && service.features.length > 0 ? (
                        service.features.map((feature, i) => (
                          <div key={i} className="flex flex-col gap-2">
                            <div className="inline-flex w-fit items-center gap-[10px] rounded-[2px] bg-[#2BA1DB] px-4 py-[2px]">
                              <p className="font-gothic text-[13px] font-normal leading-6 text-white">
                                {feature.label}
                              </p>
                            </div>
                            <p className="w-[480px] font-gothic text-base font-normal leading-6 text-[#333333] md:w-full">
                              {feature.description}
                            </p>
                          </div>
                        ))
                      ) : service.bulletPoints ? (
                        <div className="flex w-[480px] flex-col gap-0 font-gothic text-base font-normal leading-6 text-[#333333] md:w-full">
                          {service.bulletPoints.map((point, i) => (
                            <p key={i}>{point}</p>
                          ))}
                        </div>
                      ) : service.content ? (
                        <div className="flex w-[592px] flex-col gap-[3px] md:w-full">
                          <p className="font-gothic text-[20px] font-normal leading-[28px] text-[#333333]">
                            {service.content.title}
                          </p>
                          <p className="w-[480px] font-gothic text-base font-normal leading-6 text-[#333333] md:w-full">
                            {service.content.description}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
