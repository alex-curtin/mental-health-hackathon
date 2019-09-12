class CommentsController < ApplicationController
  before_action :authorize_request, except: %i[index show]
  
  def index
    @entry = Entry.find(params[:record_id])
    @comments = Comment.where(entry_id: @entry.id).order(created_at: :asc).includes(:user)
    render json: @comments, :include => {:user => {:only => %i[name]}}, status: :ok
  end

  def show
    @comment = Comment.find(params[:id])
    render json: @comment, status: :ok
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render json: @comment, :include => {:user => {:only => %i[name]}}, status: :created
    end
  end

  def update
    @comment = Comment.find(params[:id]).includes(:user)
    if @comment.update_attributes(comment_params)
      render json: @comment, :include => {:user => {:only => %i[name]}}, status: :ok
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    if @comment.destroy
      head 204
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :user_id, :entry_id)
  end

end