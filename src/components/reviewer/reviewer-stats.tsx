"use client";
import { Progress } from "@/components/ui/progress";
import StarRatingFractions from "../ui/star-rating-fractions";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { MailIcon, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
interface ReviewStatUiProps {
  stars: number;
  percentage: number;
  count: number;
}

interface ReviewStatUiData {
  stars: number;
  percentage: number;
  count: number;
}

interface ReviewerStatsProps {
  title?: string;
  subtitle?: string;
  overallRating?: number;
  totalReviewCount?: number;
  verifiedPurchases?: number;
  reviewStatUis?: ReviewStatUiData[];
  showProgress?: boolean;
}

function ReviewStatUi({ count, percentage, stars }: ReviewStatUiProps) {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="w-16 text-right text-sm">{stars} stars</div>
      <Progress value={percentage} className="h-2 flex-1" />
      <div className="text-muted-foreground w-12 text-left text-sm">
        {count}
      </div>
    </div>
  );
}

function ReviewerStats({
  overallRating = 4.7,
  reviewStatUis = [
    { count: 629, percentage: 76, stars: 5 },
    { count: 116, percentage: 14, stars: 4 },
    { count: 50, percentage: 6, stars: 3 },
    { count: 24, percentage: 3, stars: 2 },
    { count: 8, percentage: 1, stars: 1 },
  ],
  showProgress = true,
  subtitle = "What our customers are saying",
  title = "Customer Reviews",
  totalReviewCount = 827,
  verifiedPurchases = 756,
}: ReviewerStatsProps = {}) {
  const [rating, setRating] = useState(4.3);
  const [open, setOpen] = useState(false);
  const verifiedPercentage = Math.round(
    (verifiedPurchases / totalReviewCount) * 100,
  );

  return (
    <div className="flex max-w-lg flex-col gap-8 rounded-lg bg-white px-6 py-6 dark:bg-gray-950">
      <div className="flex flex-col items-center text-center">
        <h2 className="mb-1 text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground mb-6 text-sm">{subtitle}</p>

        <div className="mb-4 flex flex-col items-center">
          <span className="mb-2 text-5xl font-bold">{overallRating}</span>
          <StarRatingFractions
            value={overallRating}
            readOnly
            iconSize={24}
            className="mb-2"
          />
          <p className="text-muted-foreground text-sm">
            Based on {totalReviewCount} reviews
          </p>
        </div>

        <div className="mb-2 w-full max-w-xs rounded-md bg-gray-50 px-4 py-3 dark:bg-gray-900">
          <p className="text-sm">
            <span className="font-medium">{verifiedPercentage}%</span> of
            reviews from{" "}
            <span className="font-medium text-green-600 dark:text-green-400">
              verified purchases
            </span>
          </p>
        </div>
      </div>

      {showProgress && (
        <div className="mx-auto w-full max-w-md space-y-2">
          {reviewStatUis.map((stat) => (
            <ReviewStatUi
              key={stat.stars}
              stars={stat.stars}
              percentage={stat.percentage}
              count={stat.count}
            />
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3 text-center">
        <p className="text-sm">
          <span className="font-medium">Top Keywords:</span>{" "}
          <span className="text-muted-foreground">
            quality, easy to use, value, fast shipping, comfortable
          </span>
        </p>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="bg-primary hover:bg-primary/80 mx-auto w-full max-w-xs rounded-md px-4 py-2 text-sm font-medium text-white"
        >
          Write a Review
        </button>
        <form
          data-state={open ? "open" : "closed"}
          className="flex max-w-xl flex-col space-y-5 overflow-hidden py-5 transition-all duration-300 data-[state=closed]:pointer-events-none data-[state=closed]:max-h-0 data-[state=closed]:opacity-0 data-[state=open]:max-h-250 data-[state=open]:opacity-100"
        >
          <div className="flex flex-row items-center gap-4">
            <StarRatingFractions
              value={rating}
              onChange={setRating}
              maxStars={5}
            />
            <p>({rating})</p>
          </div>
          <InputGroup>
            <InputGroupInput
              id="username"
              required
              type="text"
              placeholder="Enter your name"
            />
            <InputGroupAddon>
              <InputGroupAddon>
                <Label htmlFor="username">
                  <span className="sr-only">username</span>
                  <UserIcon />
                </Label>
              </InputGroupAddon>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
            <InputGroupAddon>
              <Label htmlFor="email">
                <span className="sr-only">mail</span>
                <MailIcon />
              </Label>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupTextarea
              required
              id="message"
              placeholder="Enter your message"
            />
            <InputGroupAddon>
              <Label htmlFor="message">Message</Label>
            </InputGroupAddon>
          </InputGroup>
          <div className="font-semibold">
            <p>
              How we use your data: We’ll only contact you about the review you
              left, and only if necessary. By submitting your review, you agree
              to Judge.me’s terms, privacy and content policies.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen((prev) => !prev)}
            >
              Close
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewerStats;
export type { ReviewStatUiData, ReviewStatUiProps, ReviewerStatsProps };
