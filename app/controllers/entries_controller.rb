class EntriesController < ApplicationController
  before_action :authorize_request, except: %i[index show recent search show_all]
  
  def index
    @user = User.find(params[:user_id])
    @entries = Entry.where(user_id: @user.id)
    render json: @entries, status: :ok
  end

  def show
    @user = User.find(params[:user_id])
    @entry = Entry.find(params[:id])
    render json: @entry, status: :ok
  end

  def show_all
    @entries = Entry.all.includes(:user)
    render json: @entries, :include => {:user => {:only => %i[name]}}, status: :ok
  end

  def recent
    @entries = Entry.limit(12).order(created_at: :desc).includes(:user)
    render json: @entries, :include => {:user => {:only => %i[name]}}, status: :ok
  end

  def create
    @entry = Entry.new(entry_params)
    if @entry.save
      render json: @entry, status: :created
    end
  end

  def update
    @entry = Entry.find(params[:id])
    if @entry.update_attributes(entry_params)
      render json: @entry, status: :ok
    end
  end

  def destroy
    @entry = Entry.find(params[:id])
    if @entry.destroy
      head 204
    end
  end

  private

  def entry_params
    params.require(:entry).permit(:category, :title, :details, :mood, :status, :self_care, :user_id)
  end

end