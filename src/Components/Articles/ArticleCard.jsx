/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from 'react';
import './ArticleCard.css';

import moment from 'moment';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import img1 from '../../Assets/Components/Articles/corona.png';
import likeLogo from '../../Assets/Components/Articles/like.svg';
import liked from '../../Assets/Components/Articles/liked.svg';
// import defaultAuthorPhoto from '../../Assets/Components/Articles/profilePic.png';
import save from '../../Assets/Components/Articles/save.svg';
import saved from '../../Assets/Components/Articles/saved.svg';
import { useAddToBookMarkListMutation, useRemoveFromBookMarkListMutation } from '../../Redux/features/bookMark/bookMarkApi';

const nameSubstring = (name) => {
  if (name.length > 20) {
    return `${name.substr(0, 17)}...`;
  }
  return name;
}

const cardDetailsTagHandler = (categoryTags) => {
  // console.log('cardDetailsTagHandler, categoryTags ', categoryTags);
  if (categoryTags?.length > 0) {
    return categoryTags.map((categoryItem, index) => {
      if (index < 2) {
        return <div key={index} className="p-[5px] text-primary font-normal text-[0.688rem] sm:text-xs leading-[10px]  sm:leading-[14.32px] rounded bg-primary15 article-card-category-tag">{(categoryItem?.name) ? categoryItem.name : 'categoryTag'}</div>
      }
      if (index === 2) {
        return <div key={index} className="p-[5px] text-primary font-normal text-[0.688rem] sm:text-xs leading-[10px]  sm:leading-[14.32px] rounded bg-primary15 article-card-category-tag">...</div>
      }
    })
  }
}

function ArticleCard({ cardDetails }) {
  const [addToBookMarkList, { isLoading: addToBookMarkListIsLoading }] = useAddToBookMarkListMutation();
  const [removeFromBookMarkList, { isLoading: removeFromBookMarkListIsLoading }] = useRemoveFromBookMarkListMutation();
  // console.log('cardDetails = ', cardDetails);
  // console.log('cardDetails.id = ', cardDetails.id);
  const { author } = cardDetails;
  const { articlesId } = useSelector((state) => state.bookMark)
  const { id: userId } = useSelector((state) => state.MyProfilePage)
  // console.log('articlesId = ', articlesId);
  // console.log('userId  = ', userId);

  const isBookMarked = articlesId.includes(cardDetails.id);
  // console.log('isBookMarked  = ', isBookMarked);

  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();

  const saveHandler = () => {
    // console.log('Inside saveHandler');
    if (accessToken) {
      if (isBookMarked) {
        // console.log('Inside saveHandler, isBookMarked', isBookMarked);
        removeFromBookMarkList({
          bookmark_of: cardDetails.id,
          bookmark_by: userId
        });
      } else {
        addToBookMarkList({ bookmark_of: cardDetails.id });
      }
    } else {
      navigate('/sign-in');
    }
  }

  const { likedBlogsIdList } = useSelector((state) => state.LikesList);

  const isLiked = likedBlogsIdList.includes(cardDetails.id);
  // console.log('ArticleCard2, isLiked = ', isLiked);

  // for Title
  // const contentRef = useRef(null);
  // const [isOverflowed, setIsOverflowed] = useState(false);

  // useEffect(() => {
  //   if (contentRef.current) {
  //     const element = contentRef.current;
  //     const computedStyle = window.getComputedStyle(element);
  //     const lineHeight = parseFloat(computedStyle.lineHeight);
  //     const maxHeight = 3 * lineHeight; // Set to allow three lines

  //     if (element.scrollHeight > maxHeight) {
  //       setIsOverflowed(true);
  //     }
  //   }
  // }, []);
  // end of for Title

  return (
    <div className="border-2 border-transparent hover:border-primary hover:rounded-[15px]">
      <div className="bg-[#FFFFFF] rounded-xl ArticlesCardShadow ArticlesCardHeight flex overflow-hidden">

          <div className="h-full aspect-[412/382] ">
           <Link to={`/articles-details/${cardDetails.id}`}>
            <img src={(cardDetails?.post_image) ? `${process.env.REACT_APP_Base_Address + cardDetails.post_image}` : img1} alt="corona" className="h-full w-full object-cover rounded-xl" />
            </Link>
          </div>
        

        <div className="p-2 sm:p-4 lg:p-5 flex flex-col justify-between h-full w-full">
          <div className="flex flex-row justify-between items-center mb-[2px] sm:mb-[7px]">

            <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 justify-start items-center">
              {cardDetailsTagHandler(cardDetails.category)}
            </div>

            <div onClick={() => saveHandler()} className="cursor-pointer flex items-center h-full" disabled={removeFromBookMarkListIsLoading || addToBookMarkListIsLoading}>
              <img src={isBookMarked ? saved : save} alt="save" className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px] article-card-add-to-bookmark" />
            </div>
          </div>

          <Link to={`/articles-details/${cardDetails.id}`}>
            <div
              className={`text-[0.688rem] sm:text-sm xl:text-base font-medium leading-[15.09px] sm:leading-[19.09px] mb-[2px] sm:mb-[7px] article-card-content`}>
              { cardDetails.title}
            </div>
          </Link>

          <div className="flex justify-between items-center">
            {/* author Details */}
            <div className="flex items-center">
              <div>
             { author?.photo ? <img src={author?.photo} alt="author" className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] rounded-full authorPhoto object-cover" /> :  <div className='bg-primary articleCardAuthorProfilePictureContainer'><div className='w-full h-full flex text-white text-base leading-[1rem] sm:text-xl sm:leading-[1.25rem] justify-center items-center p-1'>{author?.full_name[0]}</div></div>}
              </div>

              <div className="ml-1 sm:ml-2.5 flex flex-col h-full">
                <div className="text-[0.65rem] sm:text-xs xl:text-sm font-normal text-primary leading-[12px] sm:leading-[14px] xl:leading-[16.71px] mb-0 sm:mb-[3px] article-card-author-name">{(author?.full_name) ? nameSubstring(author.full_name) : 'author'}</div>

                <div className="flex items-center">
                  <div className="cursor-pointer">
                    <img src={isLiked ? liked : likeLogo} alt="like" className="w-[10px] h-[10px] sm:w-[13px] sm:h-[13px] article-card-like" />
                  </div>
                  <div className="ml-1 text-[0.688rem] font-light text-[#757575] leading-[7.13px] sm:leading-[13.13px] article-card-like-count">
                    (
                    {(cardDetails?.total_likes) ? cardDetails.total_likes : '0'}
                    )
                  </div>

                </div>
              </div>
            </div>

            <div className='h-full flex items-end'><div className="text-[0.625rem] xl:text-xs font-light text-[#757575] leading-[14.32px]">{(cardDetails?.published_at) ? moment(cardDetails.published_at).fromNow() : 'In Review' }</div></div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ArticleCard;
