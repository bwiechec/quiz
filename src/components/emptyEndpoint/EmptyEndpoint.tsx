import ContentCard from "../contentCard/ContentCard";
import "./emptyEndpoint.css"

export default function EmptyEndpoint(){
  return (
    <ContentCard
      headerText={""}
      linkTo={'/'}
      linkText={'Return'}
    >
      <div
        className={'empty-endpoint'}
      >
        Sorry, no quizzes found in this category!
      </div>
    </ContentCard>
  )
}